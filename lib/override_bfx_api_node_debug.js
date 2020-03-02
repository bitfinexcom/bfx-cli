'use strict'

const colors = require('colors')
const sinon = require('sinon')
const { sprintf } = require('sprintf-js')
const bfxNodeAPIExampleDebug = require('bitfinex-api-node/examples/util/debug')

sinon
  .stub(bfxNodeAPIExampleDebug, 'get')
  .callsFake(() => (namespace) => (...debugArgs) => {
    console.log(colors.green('> '), sprintf(...debugArgs))
  })
