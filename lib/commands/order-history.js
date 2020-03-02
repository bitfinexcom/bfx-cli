'use strict'

const script = require('bitfinex-api-node/examples/rest2/order-history')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'order-history <market>',
  describe: 'Fetch order history',
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
