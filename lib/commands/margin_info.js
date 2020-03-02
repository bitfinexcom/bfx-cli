'use strict'

const script = require('bitfinex-api-node/examples/rest2/margin_info')
const cmdHandler = require('../cmd_handler')

script.skipAutoExec()

module.exports = {
  command: 'margin-info',
  describe: 'Fetch and display margin information',

  handler: cmdHandler(() => {
    return script.exec()
  })
}
