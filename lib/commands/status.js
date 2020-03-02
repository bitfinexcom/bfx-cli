'use strict'

const script = require('bitfinex-api-node/examples/rest2/status')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'status',
  describe: 'Query platform status',
  handler: cmdHandler(() => {
    return script.exec()
  })
}
