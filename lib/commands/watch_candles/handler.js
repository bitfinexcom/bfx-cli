'use strict'

const script = require('bitfinex-api-node/examples/ws2/candles')
const marketParam = require('../../params/market')
const tfParam = require('../../params/tf')

script.skipAutoExec()

/**
  * Opens a WSv2 connection and subscribes to a candle data channel, displaying
  * candles as they close
  *
  * @param {Object} argv - from yargs
  * @return {Promise} p - NOTE: script never completes
  */
module.exports = async (args) => {
  const { market, tf } = args
  const scriptArgs = {
    market: marketParam('market', market),
    tf: tfParam('time frame', tf)
  }

  return script.exec(scriptArgs)
}
