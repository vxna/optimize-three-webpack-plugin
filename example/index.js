// https://github.com/mrdoob/three.js/blob/dev/docs/examples/en/loaders/KTX2Loader.html

import * as THREE from 'three'

import { KTX2Loader } from '@three/loaders/KTX2Loader'
import { OrbitControls } from '@three/controls/OrbitControls'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x202020)

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
camera.position.set(2, 1.5, 1)
camera.lookAt(scene.position)
scene.add(camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

// PlaneGeometry UVs assume flipY=true, which compressed textures don't support.
const geometry = flipY(new THREE.PlaneGeometry())
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const formatStrings = {
  [THREE.RGBAFormat]: 'RGBA32',
  [THREE.RGBA_BPTC_Format]: 'RGBA_BPTC',
  [THREE.RGBA_ASTC_4x4_Format]: 'RGBA_ASTC_4x4',
  [THREE.RGB_S3TC_DXT1_Format]: 'RGB_S3TC_DXT1',
  [THREE.RGBA_S3TC_DXT5_Format]: 'RGBA_S3TC_DXT5',
  [THREE.RGB_PVRTC_4BPPV1_Format]: 'RGB_PVRTC_4BPPV1',
  [THREE.RGBA_PVRTC_4BPPV1_Format]: 'RGBA_PVRTC_4BPPV1',
  [THREE.RGB_ETC1_Format]: 'RGB_ETC1',
  [THREE.RGB_ETC2_Format]: 'RGB_ETC2',
  [THREE.RGBA_ETC2_EAC_Format]: 'RGB_ETC2_EAC',
}

// Samples: sample_etc1s.ktx2, sample_uastc.ktx2, sample_uastc_zstd.ktx2
new KTX2Loader()
  .setTranscoderPath('libs/basis/')
  .detectSupport(renderer)
  .load(
    require('./assets/sample_uastc_zstd.ktx2'),
    (texture) => {
      console.info(`transcoded to ${formatStrings[texture.format]}`)

      material.map = texture
      material.transparent = true

      material.needsUpdate = true
    },
    (p) => console.log(`...${p}`),
    (e) => console.error(e)
  )

animate()

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  renderer.render(scene, camera)
}

window.addEventListener('resize', onWindowResize)

function onWindowResize() {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

/** Correct UVs to be compatible with `flipY=false` textures. */
function flipY(geometry) {
  const uv = geometry.attributes.uv

  for (let i = 0; i < uv.count; i++) {
    uv.setY(i, 1 - uv.getY(i))
  }

  return geometry
}
