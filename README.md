# @vxna/optimize-three-webpack-plugin

[![Build Status](https://github.com/vxna/optimize-three-webpack-plugin/workflows/CI/badge.svg)](https://github.com/vxna/optimize-three-webpack-plugin/actions?query=workflow%3ACI+branch%3Amaster) [![npm](https://img.shields.io/npm/v/@vxna/optimize-three-webpack-plugin.svg)](https://www.npmjs.com/package/@vxna/optimize-three-webpack-plugin)

A compat layer that enables tree shaking and human-readable imports.

## Warning

1. `webpack@>=5` and `three@>=0.128.0` **required**.

2. I am not sure if it works with TypeScript or [react-three-fiber](https://github.com/react-spring/react-three-fiber), PR welcome.

3. `three@0.109.0` [introduced](https://github.com/mrdoob/three.js/pull/17276) ES6 in the core. If you have to [support older browsers](https://caniuse.com/#feat=es6-class), you must [transpile it](#older-browsers).

## Usage

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
// core import
import { WebGLRenderer } from 'three'

// examples import
import { GLTFLoader } from '@three/loaders/GLTFLoader'
```

## Rationale

Using basic https://threejs.org/examples/#webgl_geometry_cube example, results are:

Before:

```
> ls build -ghs
total 569K
500K -rw-r--r-- 1 None 497K Dec 15 09:13 0.ceabf32b276fff4b1659.js
 68K -rw-r--r-- 1 None  67K Dec 15 09:13 crate.da499b8537.gif
1.0K -rw-r--r-- 1 None  295 Dec 15 09:13 index.html

> gzip-size build\0.ceabf32b276fff4b1659.js
126 kB
```

After:

```
> ls build -ghs
total 381K
312K -rw-r--r-- 1 None 312K Dec 15 09:15 0.8e10d7ecdf3c9cb6f57f.js
 68K -rw-r--r-- 1 None  67K Dec 15 09:15 crate.da499b8537.gif
1.0K -rw-r--r-- 1 None  295 Dec 15 09:15 index.html

> gzip-size build\0.8e10d7ecdf3c9cb6f57f.js
78.7 kB
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
        user: 'babel-loader',
      },
    ],
  },
  plugins: [new OptimizeThreePlugin()],
}
```

## License

[MIT](./LICENSE)
