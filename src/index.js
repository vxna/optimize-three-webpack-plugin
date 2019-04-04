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
    alias: {
      '@three/core': 'three/src/Three.js',
      '@three/controls': 'three/examples/jsm/controls',
      '@three/exporters': 'three/examples/jsm/exporters',
      '@three/loaders': 'three/examples/jsm/loaders',
      '@three/pmrem': 'three/examples/jsm/pmrem',
      '@three/utils': 'three/examples/jsm/utils',
      '@three/examples': 'three/examples',
      '../../../build/three.module.js': '@three/core'
    }
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
