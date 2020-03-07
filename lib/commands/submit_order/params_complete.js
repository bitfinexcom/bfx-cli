'use strict'

const { Order } = require('bfx-api-node-models')
const orderTypeParam = require('../../params/order_type')
const marketParam = require('../../params/market')
const amountParam = require('../../params/amount')
const priceParam = require('../../params/price')

/**
  * Validates order parameters for all order types; an error is thrown if an
  * invalid or missing parameter is detected
  *
  * @param {Object} params
  * @param {string} params.type
  * @param {string} params.symbol
  * @param {number} params.amount
  * @param {number} params.price - not valid for market orders
  * @param {number} params.priceStop - for stop-limit orders
  * @param {number} params.distance - for trailing-stop orders
  */
module.exports = (params = {}) => {
  orderTypeParam('type', params.type)
  marketParam('symbol', params.symbol)
  amountParam('amount', params.amount)

  if (
    (params.type !== Order.type.MARKET) &&
    (params.type !== Order.type.EXCHANGE_MARKET)
  ) {
    priceParam('limit price', params.price)
  }

  if (
    (params.type === Order.type.STOP_LIMIT) ||
    (params.type === Order.type.EXCHANGE_STOP_LIMIT)
  ) {
    priceParam('stop price', params.priceStop)
  }

  if (
    (params.type === Order.type.TRAILING_STOP) ||
    (params.type === Order.type.EXCHANGE_TRAILING_STOP)
  ) {
    priceParam('trail distance', params.distance)
  }
}
