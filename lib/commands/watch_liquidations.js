'use strict'

const script = require('bitfinex-api-node/examples/ws2/liquidations')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'watch-liquidations',
  describe: 'Monitor the liquidations feed',
  handler: cmdHandler(() => {
    return script.exec()
  })
}
