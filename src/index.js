const fs = require('fs')
const path = require('path')

// FIXME: remove after node 10 eol
// https://github.com/feross/fromentries/blob/master/index.js
const fromEntries = (iterable) => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}

const three = path.join(path.dirname(require.resolve('three')), '..')
const examples = path.join(three, 'examples', 'jsm')

const generateAliases = () => {
  return fromEntries(
    fs
      .readdirSync(examples)
      .filter((name) => fs.statSync(path.join(examples, name)).isDirectory())
      .map((name) => [[`@three/${name}`], `three/examples/jsm/${name}`])
  )
}

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
      ...generateAliases(),
      '@three/core': 'three/src/Three.js',
      '@three/examples': 'three/examples',
      '@three/jsm': 'three/examples/jsm',
      '@three/js': 'three/examples/js',
      '../../../build/three.module.js': '@three/core',
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
