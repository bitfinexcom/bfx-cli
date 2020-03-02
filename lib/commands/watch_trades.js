'use strict'

const _isEmpty = require('lodash/isEmpty')
const script = require('bitfinex-api-node/examples/ws2/trades')
const cmdHandler = require('../cmd_handler')
const marketParam = require('../params/market')

script.skipAutoExec()

module.exports = {
  command: 'watch-trades <market>',
  describe: 'Monitor a trade feed',
  builder: {
    market: {
      alias: 'm',
      description: 'Watch by market'
    }
  },
  handler: cmdHandler((args) => {
    const { market } = args
    const scriptArgs = {}

    if (!_isEmpty(market)) {
      scriptArgs.market = marketParam('market', market)
    }

    return script.exec(scriptArgs)
  })
}
