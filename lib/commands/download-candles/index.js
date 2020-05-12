'use strict'

const cmdHandler = require('../../cmd_handler')
const handler = require('./handler')
const yargsConfig = require('./yargs_config')

/**
  * Download candles command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'download-candles',
  _auth: false
}
