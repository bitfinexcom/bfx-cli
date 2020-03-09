'use strict'

const cmdHandler = require('../../cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
  * Watch order book command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'watch-order-book',
  _auth: false
}
