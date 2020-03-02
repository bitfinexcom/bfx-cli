'use strict'

const script = require('bitfinex-api-node/examples/rest2/claim_positions')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'claim [market]',
  describe: 'Claim open position(s)',
  builder: {
    market: {
      alias: 'm',
      description: 'Claim by market'
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
