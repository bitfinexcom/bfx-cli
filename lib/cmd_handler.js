'use strict'

const colors = require('colors')
const debug = require('./debug')('>')

module.exports = (exec) => function handler (argv) {
  exec(argv).catch((e) => {
    debug('')
    debug('error: %s', colors.red(e.response ? e.response.body[2] : e.message))
    debug('try --help')
  })
}
