const OptimizeThreePlugin = require('../../src')

const getConfig = (config = {}) => {
  const defaults = {
    mode: 'production',
    optimization: { runtimeChunk: true },
    plugins: [new OptimizeThreePlugin()],
  }

  return { ...defaults, ...config }
}

module.exports = getConfig
