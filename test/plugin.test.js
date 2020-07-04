const compiler = require('./helpers/compiler')
const getConfig = require('./helpers/config')

// as of three@0.118.3
const CORE_SIZE = 10016
const EXAMPLES_SIZE = 208758

test('plugin: core import', async () => {
  const config = getConfig()
  const stats = await compiler('core.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => name === 'main.chunk.js')

  expect(size).toBe(CORE_SIZE)
  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
})

test('plugin: examples import', async () => {
  const config = getConfig()
  const stats = await compiler('examples.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => name === 'main.chunk.js')

  expect(size).toBe(EXAMPLES_SIZE)
  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
})
