jest.setTimeout(10000)

const compiler = require('./helpers/compiler')
const getConfig = require('./helpers/config')

// as of three@0.136.0
const CORE_SIZE = 7498
const EXAMPLES_SIZE = 203293

test('plugin: core import', async () => {
  const config = getConfig()
  const stats = await compiler('core.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => name === 'main.js')

  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
  expect(size).toBe(CORE_SIZE)

  if (errors.length) {
    console.log(errors)
  }
})

test('plugin: examples import', async () => {
  const config = getConfig()
  const stats = await compiler('examples.js', config)

  const { errors, assets } = stats.toJson()
  const { size, emitted } = assets.find(({ name }) => name === 'main.js')

  expect(errors).toHaveLength(0)
  expect(emitted).toBeTruthy()
  expect(size).toBe(EXAMPLES_SIZE)

  if (errors.length) {
    console.log(errors)
  }
})
