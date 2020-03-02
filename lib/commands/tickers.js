'use strict'

const script = require('bitfinex-api-node/examples/rest2/tickers')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'tickers [market]',
  describe: 'Fetch and display one or multiple tickers',
  builder: {
    market: {
      alias: 'm',
      description: 'Filter by market'
    }
  },

  handler: cmdHandler((argv) => {
    const { market } = argv
    const scriptArgs = {
      filterByMarket: marketParam('market', market, true)
    }

    return script.exec(scriptArgs)
  })
}
