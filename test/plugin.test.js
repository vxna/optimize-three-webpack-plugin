/* eslint-env jest */
const compiler = require('./helpers/compiler')
const OptimizeThreePlugin = require('../src')

const getConfig = (config = {}) => {
  const defaults = {
    mode: 'production',
    optimization: { runtimeChunk: true },
    plugins: [new OptimizeThreePlugin()]
  }

  return { ...defaults, ...config }
}

const CORE_MAX_SIZE = 9279 * 2 // as for three@0.103.0
const EXAMPLES_MAX_SIZE = 30502 * 2 // as for three@0.103.0

test('plugin: core imports', async () => {
  const config = getConfig()
  const stats = await compiler('core.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => /main\.js$/.test(name))

  expect(size).toBeLessThan(CORE_MAX_SIZE)
  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
})

test('plugin: examples imports', async () => {
  const config = getConfig()
  const stats = await compiler('examples.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => /main\.js$/.test(name))

  expect(size).toBeLessThan(EXAMPLES_MAX_SIZE)
  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
})
