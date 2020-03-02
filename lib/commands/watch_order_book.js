'use strict'

const script = require('bitfinex-api-node/examples/ws2/order_book_viz')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'watch-order-book [market]',
  describe: 'Render a live order book',
  builder: {
    market: {
      alias: 'm',
      description: 'Desired market'
    }
  },

  handler: cmdHandler((argv) => {
    const { market } = argv
    const scriptArgs = {
      market: marketParam('market', market)
    }

    return script.exec(scriptArgs)
  })
}
