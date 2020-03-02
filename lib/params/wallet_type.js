'use strict'

const _isEmpty = require('lodash/isEmpty')
const { WALLET_TYPES } = require('bfx-hf-util')
const stringParam = require('./string')

module.exports = (name, v, allowEmpty) => {
  stringParam(name, v, allowEmpty)

  if (_isEmpty(v)) {
    if (allowEmpty) {
      return v
    }

    throw new Error(`${name} must be provided`)
  }

  const vLower = v.toLowerCase()

  if (WALLET_TYPES.indexOf(vLower) === -1) {
    throw new Error(`unknown wallet type: ${v}`)
  }

  return vLower
}
