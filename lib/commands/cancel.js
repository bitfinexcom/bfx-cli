'use strict'

const script = require('bitfinex-api-node/examples/ws2/cancel_all')
const marketParam = require('../params/market')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'cancel',
  describe: 'Cancel all open orders',
  handler: cmdHandler((argv) => {
    const { market } = argv
    const scriptArgs = {
      filterByMarket: marketParam('market', market, true)
    }

    return script.exec(scriptArgs)
  })
}
