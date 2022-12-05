import fs from 'fs'
import path from 'path'
import replace from '@rollup/plugin-replace'

const withDefaults = ({ cwd = '.', envKey = 'NODE_ENV' } = {}) => ({
  cwd: path.resolve(process.cwd(), cwd),
  envKey,
})

export default function dotenvExtendedPlugin(inputOptions) {
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

  // Stringify all values so we can feed into replace plugin
  const stringified = Object.keys(process.env).reduce(
    (env, key) => {
      env['process.env.' + key] = JSON.stringify(process.env[key])
      return env
    },
    {
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV) || 'production',
    },
  )

  return {
    ...replace({
      values: stringified,
    }),
    name: 'dotenvExtended',
  }
}
