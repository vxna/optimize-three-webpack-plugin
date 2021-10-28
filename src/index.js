const fs = require('fs')
const path = require('path')

const three = path.join(path.dirname(require.resolve('three')), '..')
const examples = path.join(three, 'examples', 'jsm')

const aliases = Object.fromEntries(
  fs
    .readdirSync(examples)
    .filter((name) => fs.statSync(path.join(examples, name)).isDirectory())
    .map((name) => [[`@three/${name}`], `@three/examples/jsm/${name}`])
)

const preset = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: three,
        loader: require.resolve('./loader'),
        sideEffects: false,
      },
    ],
  },
  resolve: {
    alias: {
      ...aliases,
      '@three': three,
      three: 'three/src/Three.js',
    },
  },
}

class OptimizeThreeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.environment.tap('OptimizeThreeWebpackPlugin', () => {
      compiler.options.module.rules.push(...preset.module.rules)

      compiler.options.resolve.alias = {
        ...compiler.options.resolve.alias,
        ...preset.resolve.alias,
      }
    })
  }
}

module.exports = OptimizeThreeWebpackPlugin
