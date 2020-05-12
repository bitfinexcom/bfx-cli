'use strict'

const script = require('bitfinex-api-node/examples/ws2/liquidations')

script.skipAutoExec()

/**
  * Opens a WSv2 connection and subscribes to the liquidations feed, displaying
  * them as they happen
  *
  * @return {Promise} p - NOTE: script never ends
  */
module.exports = async () => {
  return script.exec()
}
