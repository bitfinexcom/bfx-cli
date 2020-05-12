'use strict'

const script = require('bitfinex-api-node/examples/rest2/positions')

script.skipAutoExec()

/**
  * Displays open positions
  *
  * TODO: Allow filtering by market
  *
  * @return {Promise] p - resolves on script end
  */
module.exports = async () => {
  return script.exec()
}
