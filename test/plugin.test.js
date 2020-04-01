const compiler = require('./helpers/compiler')
const getConfig = require('./helpers/config')

// as of three@0.112.0
const CORE_MAX_SIZE = 9292 * 2
const EXAMPLES_MAX_SIZE = 30954 * 2

test('plugin: core', async () => {
  const config = getConfig()
  const stats = await compiler('core.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => /main\.js$/.test(name))

  expect(size).toBeLessThan(CORE_MAX_SIZE)
  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
})

test('plugin: examples', async () => {
  const config = getConfig()
  const stats = await compiler('examples.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => /main\.js$/.test(name))

  expect(size).toBeLessThan(EXAMPLES_MAX_SIZE)
  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
})
