'use strict'

const _isEmpty = require('lodash/isEmpty')
const numberParam = require('./number')

module.exports = (name, v, allowEmpty) => {
  numberParam(name, v, allowEmpty)

  if (_isEmpty(v) && allowEmpty) {
    return v
  }

  if (v <= 0) {
    throw new Error('price must be greater than 0')
  }

  return v
}
