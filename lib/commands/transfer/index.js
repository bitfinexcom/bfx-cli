'use strict'

const cmdHandler = require('../../cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
  * Transfer command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'transfer',
  _auth: true
}
