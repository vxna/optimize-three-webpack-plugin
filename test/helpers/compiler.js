const path = require('path')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')

module.exports = function(fixture, config) {
  config = {
    mode: config.mode || 'development',
    optimization: config.optimization || {},
    context: config.context || path.resolve(process.cwd(), 'test/fixtures'),
    entry: config.entry || `./${fixture}`,
    plugins: config.plugins || []
  }

  const compiler = webpack(config)

  compiler.outputFileSystem = new MemoryFS()

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      }

      resolve(stats)
    })
  )
}
