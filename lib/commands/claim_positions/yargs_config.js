'use strict'

/**
  * Claim positions yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'claim [market]',
  describe: 'Claim open position(s)',
  builder: {
    market: {
      alias: 'm',
      description: 'Claim by market'
    }
  }
}
