'use strict'

const script = require('bitfinex-api-node/examples/rest2/close_positions')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Close open positions optionally filtering by market
  *
  * @param {Object} argv - from yargs
  * @return {Promise} p - resolves on script end
  */
module.exports = async (argv) => {
  const { market } = argv
  const scriptArgs = {
    filterByMarket: marketParam('market', market, true)
  }

  return script.exec(scriptArgs)
}
