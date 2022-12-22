import { Plugin } from 'rollup'

export interface RollupDotenvExtendedOptions {
  /**
   * @default '.'
   */
  cwd?: string

  /**
   * @default 'NODE_ENV'
   */
  envKey?: string
  include?: string | string[]
  exclude?: string | string[]
  verbose?: boolean
}

export default function dotenvExtendedPlugin(
  env?: Object,
  options?: RollupDotenvExtendedOptions,
): Plugin
