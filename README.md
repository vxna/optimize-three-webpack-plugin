# @vxna/optimize-three-webpack-plugin

[![Build Status](https://travis-ci.com/vxna/optimize-three-webpack-plugin.svg)](https://travis-ci.com/vxna/optimize-three-webpack-plugin) [![npm](https://img.shields.io/npm/v/@vxna/optimize-three-webpack-plugin.svg)](https://www.npmjs.com/package/@vxna/optimize-three-webpack-plugin)

A compat layer that enables tree shaking with JSM imports.

## Warning

`webpack@^4.0.0` and `three@^0.103.0` required.

This is possible with import name convention that I hope one day will be adopted in `three`.  
I don't know if it works with TS and I am not going to support it on my own, PR welcome.

## Import name convention

In the past, tree shaking `three` was done at the userland with a workaround by aliasing `three` to `src/Three.js`. Since `three@0.103.0`, [JSM](https://threejs.org/docs/#manual/en/introduction/Import-via-modules) initiative landed in `three` package. `JSM` files allows us to import loaders and other things from the examples folder. That's awesome but tree shaking method that we've used is breaking new `JSM` imports now.

Here comes custom import name convetion that fixes this behavior and provides more human-readable imports.

At the time of writing all available `JSM` imports are supported. You can see the full list [here](https://github.com/vxna/optimize-three-webpack-plugin/blob/master/src/aliases.js).  
`JSM` conversion is still ongoing, make sure you have latest `three` to use all aliases.

## Usage

**webpack.config.js**

```js
const OptimizeThreePlugin = require('@vxna/optimize-three-webpack-plugin')

module.exports = {
  plugins: [new OptimizeThreePlugin()]
}
```

Your code:

```js
// core
import { WebGLRenderer } from 'three'
// becomes now
import { WebGLRenderer } from '@three/core'

// loaders
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// becomes now
import { GLTFLoader } from '@three/loaders/GLTFLoader'

// controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// becomes now
import { OrbitControls } from '@three/controls/OrbitControls'
```

## Rationale

Using basic https://threejs.org/examples/#webgl_geometry_cube example, results are:

before:

```
> ls build -ghs
total 569K
500K -rw-r--r-- 1 None 497K Dec 15 09:13 0.ceabf32b276fff4b1659.js
 68K -rw-r--r-- 1 None  67K Dec 15 09:13 crate.da499b8537.gif
1.0K -rw-r--r-- 1 None  295 Dec 15 09:13 index.html

> gzip-size build\0.ceabf32b276fff4b1659.js
126 kB
```

after:

```
> ls build -ghs
total 381K
312K -rw-r--r-- 1 None 312K Dec 15 09:15 0.8e10d7ecdf3c9cb6f57f.js
 68K -rw-r--r-- 1 None  67K Dec 15 09:15 crate.da499b8537.gif
1.0K -rw-r--r-- 1 None  295 Dec 15 09:15 index.html

> gzip-size build\0.8e10d7ecdf3c9cb6f57f.js
78.7 kB
```

## License

[MIT](./LICENSE)
