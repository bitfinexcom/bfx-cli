'use strict'

const script = require('bitfinex-api-node/examples/ws2/order_book_viz')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Opens a WSv2 connection and subscribes to an order book feed, rendering a
  * CLI order book that updates live with incoming data.
  *
  * @param {Object} argv
  * @return {Promise} p - NOTE: script never resolves
  */
module.exports = (argv) => {
  const { market } = argv
  const scriptArgs = {
    market: marketParam('market', market)
  }

  return script.exec(scriptArgs)
}
