# @vxna/optimize-three-webpack-plugin

[![Build Status](https://github.com/vxna/optimize-three-webpack-plugin/workflows/CI/badge.svg)](https://github.com/vxna/optimize-three-webpack-plugin/actions?query=workflow%3ACI+branch%3Amaster) [![npm](https://img.shields.io/npm/v/@vxna/optimize-three-webpack-plugin.svg)](https://www.npmjs.com/package/@vxna/optimize-three-webpack-plugin)

A compat layer that enables tree shaking and human-readable imports.

## Warning

1. `webpack@>=5` and `three@>=0.128.0` **required**.

2. I am not sure if it works with TypeScript or [react-three-fiber](https://github.com/react-spring/react-three-fiber), PR welcome.

3. `three@0.109.0` [introduced](https://github.com/mrdoob/three.js/pull/17276) ES6 in the core. If you have to [support older browsers](https://caniuse.com/#feat=es6-class), you must [transpile it](#older-browsers).

## Usage

See full [example](./example).

Aliases always [generated](https://github.com/vxna/optimize-three-webpack-plugin/blob/master/src/index.js) at the build time by plugin itself so you're free to use anything that's inside your local [examples/jsm](https://github.com/mrdoob/three.js/tree/master/examples/jsm) folder with just omitting the `examples/jsm` part off your import.

`webpack.config.js`:

```js
const OptimizeThreePlugin = require('@vxna/optimize-three-webpack-plugin')

module.exports = {
  plugins: [new OptimizeThreePlugin()],
}
```

Your code:

```js
// lib imports
import { WebGLRenderer } from 'three'

// examples/jsm imports
import { GLTFLoader } from '@three/loaders/GLTFLoader'
```

## Rationale

Using [KTX2 texture loader](https://threejs.org/examples/webgl_loader_texture_ktx2.html) example @ `three@0.133.1`

Before:

```
$ ls -ghs dist
total 610K
4.0K drwxr-xr-x 1 197121    0 Oct 28 06:13 ./
4.0K drwxr-xr-x 1 197121    0 Oct 28 06:00 ../
   0 drwxr-xr-x 1 197121    0 Oct 28 06:08 libs/
 48K -rw-r--r-- 1 197121  48K Oct 28 06:08 91db5a3f3f298a14c81a.ktx2
1.0K -rw-r--r-- 1 197121  358 Oct 28 06:10 index.html
548K -rw-r--r-- 1 197121 545K Oct 28 06:13 main.bundle.js
1.0K -rw-r--r-- 1 197121   92 Oct 28 06:13 main.bundle.js.LICENSE.txt
4.0K -rw-r--r-- 1 197121 1.5K Oct 28 06:10 runtime.bundle.js

$ gzip-size dist/main.bundle.js
134 kB
```

After:

```
$ ls -ghs dist
total 513K
4.0K drwxr-xr-x 1 197121    0 Oct 28 06:17 ./
4.0K drwxr-xr-x 1 197121    0 Oct 28 06:00 ../
   0 drwxr-xr-x 1 197121    0 Oct 28 06:08 libs/
 48K -rw-r--r-- 1 197121  48K Oct 28 06:08 91db5a3f3f298a14c81a.ktx2
1.0K -rw-r--r-- 1 197121  358 Oct 28 06:10 index.html
452K -rw-r--r-- 1 197121 451K Oct 28 06:17 main.bundle.js
4.0K -rw-r--r-- 1 197121 1.5K Oct 28 06:10 runtime.bundle.js

$ gzip-size dist/main.bundle.js
115 kB
```

## Older browsers

Assuming that you're already using [Babel](https://github.com/babel/babel-loader), this is one of many possible ways to make `three@>=0.109.0` work in older browsers:

`webpack.config.js`:

```js
const path = require('path')
const OptimizeThreePlugin = require('@vxna/optimize-three-webpack-plugin')

const three = path.join(path.dirname(require.resolve('three')), '..')

module.exports = {
  module: {
    rules: [
      {
        include: three,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new OptimizeThreePlugin()],
}
```

## License

[MIT](./LICENSE)
