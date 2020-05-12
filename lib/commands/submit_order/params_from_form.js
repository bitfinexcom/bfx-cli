'use strict'

const _isEmpty = require('lodash/isEmpty')
const _includes = require('lodash/includes')
const { Order } = require('bfx-api-node-models')
const { Form, NumberPrompt } = require('enquirer')

const orderTypeParam = require('../../params/order_type')
const marketParam = require('../../params/market')
const amountParam = require('../../params/amount')
const priceParam = require('../../params/price')
const log = require('../../util/log')

/**
  * Renders a CLI form for supplying order parameters, and returns once
  * sufficient parameters for the parsed type are supplied.
  *
  * @return {Object} params
  */
module.exports = async () => {
  const params = {}
  let parseComplete = false
  let prompt

  // get basic details
  while (!parseComplete) {
    prompt = new Form({
      name: 'orderform',
      message: 'Enter your order details:',
      choices: [{
        name: 'type',
        message: 'Order Type',
        initial: params.type || ''
      }, {
        name: 'symbol',
        message: 'Symbol',
        initial: params.symbol || ''
      }, {
        name: 'amount',
        message: 'Amount',
        initial: params.amount || ''
      }]
    })

    const input = await prompt.run()

    try {
      params.type = orderTypeParam('order type', input.type)
      params.symbol = marketParam('market', input.symbol)
      params.amount = +amountParam('amount', _isEmpty(input.amount) ? NaN : +input.amount)
      parseComplete = true
    } catch (e) {
      log('%s\n'.red, e)
    }
  }

  log(params.type.blue)

  const quoteCCY = params.symbol.substring(4)

  // get order-specific details
  if (_includes([
    Order.type.MARKET, Order.type.EXCHANGE_MARKET
  ], params.type)) {
    parseComplete = false

    while (!parseComplete) {
      prompt = new NumberPrompt({
        name: 'price',
        message: `Limit Price (${quoteCCY}):`
      })

      const input = await prompt.run()

      try {
        params.price = priceParam('price', input)
        parseComplete = true
      } catch (e) {
        log('%s\n'.red, e)
      }
    }
  }

  if (_includes([
    Order.type.STOP_LIMIT, Order.type.EXCHANGE_STOP_LIMIT
  ], params.type)) {
    parseComplete = false

    while (!parseComplete) {
      prompt = new NumberPrompt({
        name: 'stop-price',
        message: `Stop Price (${quoteCCY}):`
      })

      const input = await prompt.run()

      try {
        params.priceStop = priceParam('stop price', input)
        parseComplete = true
      } catch (e) {
        log('%s\n'.red, e)
      }
    }
  }

  if (_includes([
    Order.type.TRAILING_STOP, Order.type.EXCHANGE_TRAILING_STOP
  ], params.type)) {
    parseComplete = false

    while (!parseComplete) {
      prompt = new NumberPrompt({
        name: 'trail-distance',
        message: `Trailing Distance (${quoteCCY}):`
      })

      const input = await prompt.run()

      try {
        params.distance = priceParam('trailing distance', input)
        parseComplete = true
      } catch (e) {
        log('%s\n'.red, e)
      }
    }
  }

  return params
}
