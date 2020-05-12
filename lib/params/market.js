'use strict'

const _isEmpty = require('lodash/isEmpty')
const { SYMBOLS } = require('bfx-hf-util')
const _includes = require('lodash/includes')
const stringParam = require('./string')

const SYMBOL_LIST = Object.values(SYMBOLS)

module.exports = (name, v, allowEmpty) => {
  stringParam(name, v, allowEmpty)

  if (_isEmpty(v)) {
    if (allowEmpty) {
      return v
    }

    throw new Error(`${name} must be provided`)
  }

  // Remove seperators, format as uppercase
  const market = v
    .split('')
    .filter(c => (
      (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90) ||
      (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122)
    ))
    .join('')

  const upperMarket = market.length === 6
    ? `t${market.toUpperCase()}`
    : `t${market.substring(1).toUpperCase()}`

  if (!_includes(SYMBOL_LIST, upperMarket)) {
    throw new Error(`unknown market: ${v}`)
  }

  return upperMarket
}
