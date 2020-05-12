'use strict'

/**
  * Platform status yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'affiliate <code>',
  describe: 'Set affiliate code',
  builder: {
    code: {
      description: 'Affiliate code'
    }
  }
}
