'use strit'

const script = require('bitfinex-api-node/examples/rest2/currencies')

script.skipAutoExec()

/**
  * Displays a list of all tradable currencies
  *
  * @return {Promise} p - resolves on script end
  */
module.exports = () => {
  return script.exec()
}
