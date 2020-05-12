'use strict'

const cmdHandler = require('../../cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
 * Watch candles command
 *
 * @type {Object}
 */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'watch-candles',
  _auth: false
}
