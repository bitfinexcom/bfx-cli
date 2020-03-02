'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')

module.exports = (name, v, allowEmpty) => {
  if (_isEmpty(v) && allowEmpty) {
    return v
  } else if (!_isString(v)) {
    throw new Error(`${name} must be a string`)
  }

  return v
}
