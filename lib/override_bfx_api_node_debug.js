'use strict'

const sinon = require('sinon')
const bfxNodeAPIExampleDebug = require('bitfinex-api-node/examples/util/debug')
const log = require('./util/log')

sinon
  .stub(bfxNodeAPIExampleDebug, 'get')
  .callsFake(() => () => (...debugArgs) => {
    log(...debugArgs)
  })
