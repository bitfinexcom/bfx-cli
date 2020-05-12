'use strict'

const script = require('bitfinex-api-node/examples/rest2/tickers')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Displays a list of tickers optionally filtered by market
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
