const preset = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /three/,
        loader: require.resolve('./loader'),
        sideEffects: false
      }
    ]
  },
  resolve: {
    alias: require('./aliases')
  }
}

class OptimizeThreeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.environment.tap('OptimizeThreeWebpackPlugin', () => {
      compiler.options.resolve.alias = {
        ...compiler.options.resolve.alias,
        ...preset.resolve.alias
      }

      compiler.options.module.rules.push(...preset.module.rules)
    })
  }
}

module.exports = OptimizeThreeWebpackPlugin
