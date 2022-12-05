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
}

export default function dotenvExtendedPlugin(options?: RollupDotenvExtendedOptions): Plugin
