'use strict'

const numberParam = require('./number')

module.exports = (name, v) => {
  numberParam(name, v)

  return v
}
