'use strict'

const script = require('bitfinex-api-node/examples/rest2/order-history')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Fetches and displays account order history optionally filtering by market
  *
  * @param {Object} argv - from yargs
  * @return {Promise} p - resolves on script end
  */
module.exports = async (argv) => {
  const { market } = argv
  const scriptArgs = {
    market: marketParam('market', market, true)
  }

  return script.exec(scriptArgs)
}
