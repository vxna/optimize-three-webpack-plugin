const path = require('path')

const { createFsFromVolume, Volume } = require('memfs')
const webpack = require('webpack')

module.exports = (fixture, config) => {
  config = {
    mode: config.mode || 'development',
    optimization: config.optimization || {},
    context: config.context || path.resolve(__dirname, '../fixtures'),
    entry: config.entry || path.resolve(__dirname, '../fixtures', fixture),
    output: {
      path: path.resolve(__dirname, '../output'),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    ...config,
  }

  const compiler = webpack(config)

  if (!config.outputFileSystem) {
    const outputFileSystem = createFsFromVolume(new Volume())
    outputFileSystem.join = path.join.bind(path)

    compiler.outputFileSystem = outputFileSystem
  }

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      }

      resolve(stats)
    })
  )
}
