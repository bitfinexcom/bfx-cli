'use strict'

const cmdHandler = require('../../cmd_handler')
const handler = require('./handler')
const yargsConfig = require('./yargs_config')

/**
  * Margin info command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'margin-info',
  _auth: true
}
