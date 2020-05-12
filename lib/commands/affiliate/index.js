'use strict'

const cmdHandler = require('../../cmd_handler')
const yargsConfig = require('./yargs_config')
const handler = require('./handler')

module.exports = {
  ...yargsConfig,
  handler: cmdHandler(handler)
}
