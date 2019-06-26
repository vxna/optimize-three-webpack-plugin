const modules = {
  '@three/animation': 'three/examples/jsm/animation',
  '@three/cameras': 'three/examples/jsm/cameras',
  '@three/controls': 'three/examples/jsm/controls',
  '@three/curves': 'three/examples/jsm/curves',
  '@three/effects': 'three/examples/jsm/effects',
  '@three/exporters': 'three/examples/jsm/exporters',
  '@three/geometries': 'three/examples/jsm/geometries',
  '@three/interactive': 'three/examples/jsm/interactive',
  '@three/libs': 'three/examples/jsm/libs',
  '@three/lights': 'three/examples/jsm/lights',
  '@three/lines': 'three/examples/jsm/lines',
  '@three/loaders': 'three/examples/jsm/loaders',
  '@three/math': 'three/examples/jsm/math',
  '@three/misc': 'three/examples/jsm/misc',
  '@three/modifiers': 'three/examples/jsm/modifiers',
  '@three/objects': 'three/examples/jsm/objects',
  '@three/pmrem': 'three/examples/jsm/pmrem',
  '@three/postprocessing': 'three/examples/jsm/postprocessing',
  '@three/renderers': 'three/examples/jsm/renderers',
  '@three/shaders': 'three/examples/jsm/shaders',
  '@three/utils': 'three/examples/jsm/utils',
  '@three/vr': 'three/examples/jsm/vr'
}

const internals = {
  '@three/core': 'three/src/Three.js',
  '@three/examples': 'three/examples',
  '@three/jsm': 'three/examples/jsm',
  '@three/js': 'three/examples/js',
  '../../../build/three.module.js': '@three/core'
}

module.exports = { ...modules, ...internals }
