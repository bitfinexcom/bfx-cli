'use strict'

const script = require('bitfinex-api-node/examples/rest2/list_open_orders')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Displays open orders optionally filtering by market
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
