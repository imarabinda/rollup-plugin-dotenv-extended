# rollup-plugin-dotenv-extended

## Installation

```console
npm install rollup-plugin-dotenv-extended
```
This package extends functionality of  ```rollup-plugin-inject-process-env``` plugin.

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import dotenvExtended from "rollup-plugin-dotenv-extended"

export default {
  input: "src/index.js",
  output: [
    dir: "dist/build"
  ],
  plugins: [
    dotenvExtended(
        env: object,
        options?: {
            cwd?:string,
            envKey?:string,
            include?: string | string[],
            exclude?: string | string[],
            verbose?: boolean
        })
  ]
}
```

create your `.env` file in the root of your project.

```bash
# .env
FOO=bar

FOO_EXTENDED=`${FOO}`
```

so you can use FOO & FOO_EXTENDED in your javascript files.

```js
// src/index.js
console.log(process.env.FOO)
console.log(process.env.FOO_EXTENDED)
```

your env variables will be replaced by their values in your bundled file.

```js
// dist/build/index.js
console.log('bar')
console.log('bar')
```

if you want to know more about the principle and restrictions of replacement, please read [@rollup/plugin-replace](https://www.npmjs.com/package/@rollup/plugin-replace) notes.

## Options

You can specify the options below.

### `env`

Type: `Object`
Default: `{}`
Pass any JSON object to the plugin that will be set as the process.env value. This object accept members value of any type.The value will override .env values if exists same key.

### `options`

### `cwd`

Type: `String`
Default: `"."`

directory in which to search for env files.

### `envKey`

Type: `String`
Default: `"NODE_ENV"`

key used to search for .env files by node environment

### `include`

Type: `String | String[]`
Default: `""`

### `exclude`

Type: `String | String[]`
Default: `""`

The include and exclude options allow to explicitely specify with a [minimatch pattern](https://github.com/isaacs/minimatch) the files to accept or reject. By default, all files are targeted and no files are rejected.

### `verbose`

Type: `Boolean`
Default: `false`

This option allows to show which file is included in the process and which one is excluded.

Rollup will merge env vars located at

```js
[
  `.env.${process.env[envKey]}.local`,
  `.env.${process.env[envKey]}`,
  '.env.local',
  '.env',
]
```

so if you are in `prod`, rollup will search in

```js
['.env.prod.local', '.env.prod', '.env.local', '.env']
``` 
and merge the result.

> Variables starting with ```ROLLUP_``` will be included from .env files.

[LICENSE (MIT)](/LICENSE)
### Who ?

* [Arabinda](http://imarabinda.in)
* [Arabinda@Github](http://github.com/imarabinda)