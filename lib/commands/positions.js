'use strict'

const script = require('bitfinex-api-node/examples/rest2/positions')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'positions',
  describe: 'Fetch & display all open positions',
  handler: cmdHandler(() => {
    return script.exec()
  })
}
