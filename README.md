# @vxna/optimize-three-webpack-plugin

A compat layer that enables tree shaking with JSM imports.

## Warning

This is possible with import name convention that I hope one day will be adopted in `three`.  
I don't know if it works with TS and I am not going too support it on my own, PR welcome.

## Import name convention

Thanks to [JSM](https://github.com/mrdoob/three.js/search?q=JSM&type=Commits) initiative, we can now import loaders and things from examples folder but with simply aliasing `three` to `src/Three.js` tree shaking won't catch `JSM` imports. Here comes custom import name convetion that fixes this behavior and provides more human-readable imports.

At the time of writing all available JSM imports are supported. You can see the full list [here](https://github.com/vxna/optimize-three-webpack-plugin/blob/master/src/index.js#L14-L21).

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
// lib imports
import { WebGLRenderer } from 'three'
// becomes now
import { WebGLRenderer } from '@three/core'

// jsm loaders imports
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// becomes now
import { GLTFLoader } from '@three/loaders/GLTFLoader'

// jsm controls imports
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
