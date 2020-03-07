'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')

module.exports = (name, v, allowEmpty) => {
  if (_isEmpty(v)) {
    if (allowEmpty) {
      return v
    } else {
      throw new Error(`${name} cannot be empty`)
    }
  } else if (!_isString(v)) {
    throw new Error(`${name} must be a string`)
  }

  return v
}
