'use strict'

const yargsConfig = require('./yargs_config')
const handler = require('./handler')
const cmdHandler = require('../../cmd_handler')

/**
  * Credentials management command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'credentials',
  _auth: false
}
