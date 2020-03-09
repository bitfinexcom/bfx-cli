'use strict'

const _isEmpty = require('lodash/isEmpty')
const script = require('bitfinex-api-node/examples/ws2/trades')
const marketParam = require('../../params/market')

script.skipAutoExec()

/**
  * Opens a WSv2 connection and subscribes to a trade feed, displaying trades
  * as they arrive
  *
  * @param {Object} args - from yargs
  * @return {Promise} p - NOTE: script never ends
  */
module.exports = (args) => {
  const { market } = args
  const scriptArgs = {}

  if (!_isEmpty(market)) {
    scriptArgs.market = marketParam('market', market)
  }

  return script.exec(scriptArgs)
}
