const constants = require('./gl-constants')

function optimize(loader, source, resource) {
  if (process.env.NODE_ENV !== 'production') return source

  if (/\.glsl.js$/.test(resource)) {
    source = source.replace(/\`((.*|\n|\r\n)*)\`/, (match, p1) => {
      return JSON.stringify(
        p1
          .trim()
          .replace(/[ \t]*\/\/.*\n/g, '')
          .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '')
          .replace(/\n{2,}/g, '\n')
      )
    })
  }

  source = source.replace(/_?gl\.([A-Z0-9_]+)/g, (match, p1) => {
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
