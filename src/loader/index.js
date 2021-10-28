const WEBGL_CONSTANTS = require('./webgl-constants')

const WEBGL_CONSTANTS_RE = /_?gl\.([A-Z0-9_]+)/g
const GLSL_LITERALS_RE = /\/\* glsl \*\/`(.*?)`/gs

// https://github.com/mrdoob/three.js/blob/dev/utils/build/rollup.config.js
const optimize = (source, resourcePath) => {
  if (process.env.NODE_ENV !== 'production') {
    return source
  }

  if (/\.glsl.js$/.test(resourcePath)) {
    source = source.replace(GLSL_LITERALS_RE, (match, p1) => {
      return JSON.stringify(
        p1
          .trim()
          .replace(/\r/g, '')
          .replace(/[ \t]*\/\/.*\n/g, '') // remove //
          .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
          .replace(/\n{2,}/g, '\n') // # \n+ to \n
      )
    })
  }

  source = source.replace(WEBGL_CONSTANTS_RE, (match, p1) => {
    if (p1 in WEBGL_CONSTANTS) {
      return WEBGL_CONSTANTS[p1]
    }

    console.log(`Unhandled WebGL constant: ${p1}`)

    return match
  })

  return source
}

module.exports = function (source) {
  const callback = this.async()
  const resourcePath = this.resourcePath

  this.cacheable()

  callback(null, optimize(source, resourcePath))
}
