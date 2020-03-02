'use strict'

const _isEmpty = require('lodash/isEmpty')
const { Order } = require('bfx-api-node-models')
const stringParam = require('./string')
const matchWord = require('../util/match_word')

const TYPES = Object
  .keys(Order.type)
  .map(k => k.indexOf('EXCHANGE') === -1 && k.indexOf(' ') === -1 ? k : null)
  .filter(k => !!k)
  .map(k => (
    k.indexOf('_') !== -1
      ? k.split('_')
      : [k]
  ))
  .sort((a, b) => b.length - a.length)

/**
 * Parses an order param from a variadic string (i.e. ex-li -> EXCHANGE_LIMIT)
 *
 * @param {string} name - field name
 * @param {string|number} v - incoming value
 * @param {boolean} allowEmpty - if true and empty, returns value as-is
 */
const orderTypeParam = (name, v, allowEmpty) => {
  stringParam(name, v, allowEmpty)

  if (_isEmpty(v) && allowEmpty) {
    return v
  }

  let type = null

  for (let i = 0; i < TYPES.length; i += 1) {
    const matches = TYPES[i].map(word => matchWord(v, [word]))

    if (matches.indexOf(null) === -1) {
      type = TYPES[i].join('_')
      break
    }
  }

  if (!type) {
    throw new Error(`unknown order type: ${v}`)
  }

  return v.indexOf('x') === -1
    ? type
    : `EXCHANGE_${type}`
}

module.exports = orderTypeParam
module.exports.TYPES = TYPES
