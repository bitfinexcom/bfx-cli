'use strict'

/**
  * Close positions yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'close [market]',
  describe: 'Close open position(s)',
  builder: {
    market: {
      alias: 'm',
      description: 'Close by market'
    }
  }
}
