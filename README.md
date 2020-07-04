# @vxna/optimize-three-webpack-plugin

[![Build Status](https://travis-ci.com/vxna/optimize-three-webpack-plugin.svg)](https://travis-ci.com/vxna/optimize-three-webpack-plugin) [![npm](https://img.shields.io/npm/v/@vxna/optimize-three-webpack-plugin.svg)](https://www.npmjs.com/package/@vxna/optimize-three-webpack-plugin)

A compat layer that enables tree shaking and human-readable imports.

## Warning

1. `webpack@>=4.0.0` and `three@>=0.103.0` required.

2. It doesn't work with [react-three-fiber](https://github.com/react-spring/react-three-fiber), PR welcome.

3. I am not sure if it works with TypeScript, PR welcome.

4. Examples ESM conversion seems finished, so this package is in the maintenance mode.

5. `three@0.109.0` [introduced](https://github.com/mrdoob/three.js/pull/17276) ES6 in the core. If you have to [support older browsers](https://caniuse.com/#feat=es6-class), you must [transpile it](#older-browsers).

## Usage

Aliases always [generated](https://github.com/vxna/optimize-three-webpack-plugin/blob/master/src/index.js) at the build time by plugin itself so you're free to use anything that's inside your local [examples](https://github.com/mrdoob/three.js/tree/master/examples/jsm) folder with just omitting the `examples/jsm` part off your import.

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
// becomes now
import { WebGLRenderer } from '@three/core'

// examples import
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// becomes now
import { GLTFLoader } from '@three/loaders/GLTFLoader'
```

## Custom module aliases

In the past, one of possible ways to tree shake `three` was to use `"sideEffects": false` flag in `webpack` and alias `three` to `src/Three.js` instead of `build/three.module.js`. Since `three@0.103.0`, ESM [support for examples](https://threejs.org/docs/#manual/en/introduction/Import-via-modules) landed in `three` package. This change allows us to import loaders and other things from the examples folder with ease.

The problem is that tree shaking method we've used isn't compatible with ESM examples. I am not sure if using custom module aliases is actually the best solution for everyone, but at least it works for me and gives desired results.

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
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new OptimizeThreePlugin()],
}
```

## License

[MIT](./LICENSE)
