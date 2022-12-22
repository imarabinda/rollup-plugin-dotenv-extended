const terser = require('@rollup/plugin-terser')
const pkg = require('./package.json')
const babel = require('@rollup/plugin-babel')

export default {
  input: 'src/index.js',
  output: { file: pkg.main, format: 'cjs' },
  external: (id) => !/^(\.|\/)/.test(id),
  plugins: [babel({ babelHelpers: 'bundled' }), terser()],
}
