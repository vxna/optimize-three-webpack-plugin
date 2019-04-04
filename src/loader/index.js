const constants = require('./gl-constants')

const GL_CONSTANTS_RE = /_?gl\.([A-Z0-9_]+)/g
const GLSL_LITERALS_RE = /\/\* glsl \*\/\`((.*|\n|\r\n)*)\`/

function optimize(loader, source, resource) {
  if (process.env.NODE_ENV !== 'production') return source

  // https://github.com/mrdoob/three.js/blob/dev/rollup.config.js#L171-L182
  if (/\.glsl.js$/.test(resource)) {
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

  // https://github.com/mrdoob/three.js/blob/dev/rollup.config.js#L144-L150
  source = source.replace(GL_CONSTANTS_RE, (match, p1) => {
    if (p1 in constants) return constants[p1]

    loader.emitWarning(new Error(`Unhandled GL Constant: ${p1}`))
    return match
  })

  return source
}

module.exports = function(source) {
  const callback = this.async()
  const resource = this.resourcePath

  this.cacheable()

  callback(null, optimize(this, source, resource))
}
