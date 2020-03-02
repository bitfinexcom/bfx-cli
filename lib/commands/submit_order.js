'use strict'

const PI = require('p-iteration')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')
const _isEmpty = require('lodash/isEmpty')
const script = require('bitfinex-api-node/examples/rest2/submit_order')

const debug = require('../debug')('>')
const cmdHandler = require('../cmd_handler')
const orderTypeParam = require('../params/order_type')
const marketParam = require('../params/market')
const amountParam = require('../params/amount')
const priceParam = require('../params/price')

script.skipAutoExec()

/**
  * Extracted so we can handle piped arrays of orders
  *
  * @param {Object} args - order args, check below
  * @returns {Promise}
  */
const doSubmit = (args) => {
  if (!_isFinite(args.amount)) throw new Error('invalid/missing order amount')
  if (_isEmpty(args.symbol)) throw new Error('order symbol required')
  if (_isEmpty(args.type)) throw new Error('order type required')
  if (!_isFinite(args.price) && args.type.indexOf('MARKET') === -1) {
    throw new Error('invalid/missing order price')
  }

  return script.exec(args)
}

module.exports = {
  command: 'order',
  describe: 'Submit an order',
  builder: {
    options: {
      array: true
    },

    market: {
      description: 'Target market for order',
      alias: 'm'
    },

    price: {
      description: 'Order price (not valid for market orders)'
    },

    amount: {
      description: 'Order amount'
    },

    type: {
      description: 'Order type'
    }
  },

  handler: cmdHandler((argv) => {
    const { _ } = argv
    const args = _.slice(1)

    if (args.length < 3) {
      const pipedArgs = JSON.parse(args[0])

      if (_isArray(pipedArgs)) {
        return PI.forEachSeries(pipedArgs, (orderArgs) => doSubmit({
          skipConfirm: true,
          onlySubmitOrder: true,
          symbol: marketParam('market', orderArgs.symbol),
          price: priceParam('price', +orderArgs.price, true),
          amount: amountParam('amount', +orderArgs.amount),
          type: orderTypeParam('order type', orderArgs.type)
        }))
      } else if (_isObject(pipedArgs)) {
        return doSubmit({
          skipConfirm: true,
          onlySubmitOrder: true,
          symbol: marketParam('market', pipedArgs.symbol),
          price: priceParam('price', +pipedArgs.price, true),
          amount: amountParam('amount', +pipedArgs.amount),
          type: orderTypeParam('order type', pipedArgs.type)
        })
      }

      return debug('insufficient arguments provided; try --help')
    }

    const scriptArgs = { onlySubmitOrder: true }
    const numNumericArgs = args.filter(a => _isFinite(+a)).length

    args.forEach(arg => {
      if (_isFinite(+arg)) {
        if (_isFinite(scriptArgs.price) || numNumericArgs === 1) {
          scriptArgs.amount = amountParam('amount', +arg) // price comes first
        } else {
          scriptArgs.price = priceParam('price', +arg)
        }
      } else {
        try {
          scriptArgs.symbol = marketParam('market', arg)
        } catch (e) {
          scriptArgs.type = orderTypeParam('order type', arg)
        }
      }
    })

    return doSubmit(scriptArgs)
  })
}
