'use strit'

const script = require('bitfinex-api-node/examples/rest2/trade-history')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Displays account trade history optionally filtered by market
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
