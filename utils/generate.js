const fs = require('fs')
const path = require('path')

const getModules = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((name) => fs.statSync(path.join(dir, name)).isDirectory())
    .map((name) => `'@three/${name}': 'three/examples/jsm/${name}'`)
}

const aliases = `
  const modules = {
    ${getModules(path.resolve(__dirname, '../node_modules/three/examples/jsm'))}
  }
  
  const internals = {
    '@three/core': 'three/src/Three.js',
    '@three/examples': 'three/examples',
    '@three/jsm': 'three/examples/jsm',
    '@three/js': 'three/examples/js',
    '../../../build/three.module.js': '@three/core'
  }
  module.exports = { ...modules, ...internals }
  `

fs.writeFileSync(path.resolve(__dirname, '../src/aliases.js'), aliases)
