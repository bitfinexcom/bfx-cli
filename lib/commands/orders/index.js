'use strict'

const cmdHandler = require('../../cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
  * Orders command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'orders',
  _auth: true
}
