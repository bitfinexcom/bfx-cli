'use strict'

const script = require('bitfinex-api-node/examples/rest2/margin_info')

script.skipAutoExec()

/**
  * Displays margin account information (tradable balance, etc)
  */
module.exports = async () => {
  return script.exec()
}
