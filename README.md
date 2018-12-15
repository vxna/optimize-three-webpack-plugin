# @vxna/optimize-three-webpack-plugin

A compat layer that enables tree shaking without tears

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

## Usage

**webpack.config.js**

```js
const OptimizeThreePlugin = require('@vxna/optimize-three-webpack-plugin')

module.exports = {
  plugins: [new OptimizeThreePlugin()]
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
