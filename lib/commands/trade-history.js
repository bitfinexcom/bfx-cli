'use strict'

const script = require('bitfinex-api-node/examples/rest2/trade-history')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'trade-history <market>',
  describe: 'Fetch trade history',
  builder: {
    market: {
      alias: 'm',
      description: 'Market to fetch history for'
    }
  },

  handler: cmdHandler((argv) => {
    const { market } = argv
    const scriptArgs = {
      market: marketParam('market', market, true)
    }

    return script.exec(scriptArgs)
  })
}
