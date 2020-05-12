'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isFinite = require('lodash/isFinite')

module.exports = (name, v, allowEmpty) => {
  if (_isEmpty(v) && allowEmpty) {
    return v
  } if (!_isFinite(v)) {
    throw new Error(`${name} must be a number`)
  }

  return v
}
