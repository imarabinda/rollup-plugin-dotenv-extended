import fs from 'fs'
import path from 'path'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

const withDefaults = ({ cwd = '.', envKey = 'NODE_ENV' }) => ({
  cwd: path.resolve(process.cwd(), cwd),
  envKey,
})

export default function dotenvExtendedPlugin(env = {}, inputOptions = {}) {
  const { include, exclude, verbose } = inputOptions
  const { cwd, envKey } = withDefaults(inputOptions)

  var dotenvFiles = [
    `.env.${process.env[envKey]}.local`,
    `.env.${process.env[envKey]}`,
    '.env.local',
    '.env',
  ].filter(Boolean)

  dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      const dotEnvExtend = require('dotenv-expand')
      const dotEnv = require('dotenv').config({
        path: path.join(cwd, dotenvFile),
      })
      dotEnvExtend.expand(dotEnv)
    }
  })

  // Values to feed
  const values = Object.keys(process.env).reduce(
    (env, key) => {
      env[key] = process.env[key]
      return env
    },
    {
      NODE_ENV: process.env.NODE_ENV || 'production',
    },
  )

  return {
    ...injectProcessEnv({ ...values, ...env }, { include, exclude, verbose }),
    name: 'dotenvExtended',
  }
}
