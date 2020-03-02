'use strict'

const script = require('bitfinex-api-node/examples/rest2/currencies')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'currencies',
  describe: 'Fetch & display all available currencies',
  handler: cmdHandler(() => {
    return script.exec()
  })
}
