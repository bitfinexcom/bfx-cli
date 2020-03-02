'use strict'

const numberParam = require('./number')

module.exports = (name, v) => {
  numberParam(name, v)

  // TODO: add minimum order size validation

  return v
}
