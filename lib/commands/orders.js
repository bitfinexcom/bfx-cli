'use strict'

const script = require('bitfinex-api-node/examples/rest2/list_open_orders')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'orders [market]',
  describe: 'Fetch & display all open orders',
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
