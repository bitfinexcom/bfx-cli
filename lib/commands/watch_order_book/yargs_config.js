'use strict'

/**
  * Watch order book command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'watch-order-book [market]',
  describe: 'Render a live order book',
  builder: {
    market: {
      alias: 'm',
      description: 'Desired market'
    }
  }
}
