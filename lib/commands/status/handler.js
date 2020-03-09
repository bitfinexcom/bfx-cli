'use strict'

const script = require('bitfinex-api-node/examples/rest2/status')

script.skipAutoExec()

/**
  * Displays the current platform status (maintenance, etc)
  *
  * @return {Promise} p - resolves on script
  */
module.exports = async () => {
  return script.exec()
}
