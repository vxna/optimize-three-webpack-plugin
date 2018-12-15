const path = require('path')

const createPreset = ctx => {
  const res = p => path.resolve(ctx, 'node_modules/' + p)
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: res('three'),
          loader: require.resolve('./loader'),
          sideEffects: false
        }
      ]
    },
    resolve: {
      alias: {
        three: res('three/src/Three.js')
      }
    }
  }
}

class OptimizeThreeWebpackPlugin {
  apply(compiler) {
    const preset = createPreset(compiler.context)

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
