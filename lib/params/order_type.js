'use strict'

const _isEmpty = require('lodash/isEmpty')
const _includes = require('lodash/includes')
const { Order } = require('bfx-api-node-models')
const stringParam = require('./string')
const matchWord = require('../util/match_word')

const TYPES = Object
  .keys(Order.type)
  .map(k => !_includes(k, 'EXCHANGE') && !_includes(k, ' ') ? k : null)
  .filter(k => !!k)
  .map(k => (
    _includes(k, '_')
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

  if (_isEmpty(v)) {
    if (allowEmpty) {
      return v
    } else {
      throw new Error(`${name} cannot be empty`)
    }
  }

  const matches = []

  for (let i = 0; i < TYPES.length; i += 1) {
    const matchedWords = matchWord(v, TYPES[i])

    if (!_isEmpty(matchedWords)) {
      matches.push(matchedWords)
    }
  }

  if (_isEmpty(matches)) {
    throw new Error(`unknown order type: ${v}`)
  }

  // Take match with most words
  matches.sort((a, b) => b.join('').length - a.join('').length)

  const type = matches[0].join(' ')

  return _includes(v.toLowerCase(), 'x')
    ? `EXCHANGE ${type}`
    : type
}

module.exports = orderTypeParam
module.exports.TYPES = TYPES
