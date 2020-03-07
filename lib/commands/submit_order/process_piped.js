'use strict'

const { Order } = require('bfx-api-node-models')
const orderTypeParam = require('../../params/order_type')
const marketParam = require('../../params/market')
const amountParam = require('../../params/amount')
const priceParam = require('../../params/price')

/**
  * Converts raw parameters from a piped source (or raw user input) to valid
  * values, and validates them. Supports all order types.
  *
  * @param {Object} args
  * @param {boolean} requireConfirmation
  * @return {Object} processed
  */
module.exports = (args, requireConfirmation) => {
  const data = {
    symbol: marketParam('market', args.symbol),
    amount: amountParam('amount', +args.amount),
    type: orderTypeParam('order type', args.type)
  }

  if (
    (data.type !== Order.type.MARKET) &&
    (data.type !== Order.type.EXCHANGE_MARKET)
  ) {
    data.price = priceParam('price', +args.price)
  }

  if (
    (data.type === Order.type.STOP_LIMIT) ||
    (data.type === Order.type.EXCHANGE_STOP_LIMIT)
  ) {
    data.priceStop = priceParam('stop price', +args.priceStop)
  }

  if (
    (data.type === Order.type.TRAILING_STOP) ||
    (data.type === Order.type.EXCHANGE_TRAILING_STOP)
  ) {
    data.distance = priceParam('trailing distance', +args.distance)
  }

  return {
    ...data,

    // script config
    skipConfirm: !requireConfirmation,
    onlySubmitOrder: true
  }
}
