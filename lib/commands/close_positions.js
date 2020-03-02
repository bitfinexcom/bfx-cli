'use strict'

const script = require('bitfinex-api-node/examples/rest2/close_positions')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'close [market]',
  describe: 'Close open position(s)',
  builder: {
    market: {
      alias: 'm',
      description: 'Close by market'
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
