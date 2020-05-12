'use strict'

const script = require('bitfinex-api-node/examples/ws2/cancel_all')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Cancels open orders optionally filtered by market
  *
  * @param {Object} argv - from yargs
  * @return {Promise} p - resolves on script end
  */
module.exports = (argv) => {
  const { market } = argv
  const scriptArgs = {
    filterByMarket: marketParam('market', market, true)
  }

  return script.exec(scriptArgs)
}
