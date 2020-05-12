'use strict'

const _isEmpty = require('lodash/isEmpty')
const { CURRENCIES } = require('bfx-hf-util')
const _includes = require('lodash/includes')
const stringParam = require('./string')

const CURRENCY_LIST = Object.values(CURRENCIES)

module.exports = (name, v, allowEmpty) => {
  stringParam(name, v, allowEmpty)

  if (_isEmpty(v)) {
    if (allowEmpty) {
      return v
    }

    throw new Error(`${name} must be provided`)
  }

  if (!_includes(CURRENCY_LIST, v)) {
    throw new Error(`unknown currency: ${v}`)
  }

  return v
}
