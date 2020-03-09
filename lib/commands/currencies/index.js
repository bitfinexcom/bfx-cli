'use strict'

const cmdHandler = require('../../cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

/**
  * List currencies command
  *
  * @type {Object}
  */
module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler),

  _id: 'currencies',
  _auth: false
}
