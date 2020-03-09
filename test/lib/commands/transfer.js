/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/transfer')
const transfer = require('../../../lib/commands/transfer')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('transfer', async () => {
  const getScriptArgs = (overrides = {}) => ({
    amount: 6,
    fromType: 'trading',
    fromCCY: 'USD',
    toType: 'deposit',
    toCCY: 'USD',
    ...overrides
  })

  const getHandlerArgs = (overrides = {}) => ({
    q: 6,
    ccy: 'USD',
    src: 'trading',
    dest: 'deposit',
    ...overrides
  })

  await validateCommand(transfer, script, [{
    label: 'passes currency param',
    scriptArgs: getScriptArgs({ fromCCY: 'LEO', toCCY: 'LEO' }),
    handlerArgs: getHandlerArgs({ ccy: 'LEO' })
  }, {
    label: 'passes amount param',
    scriptArgs: getScriptArgs({ amount: 6 }),
    handlerArgs: getHandlerArgs({ q: 6 })
  }, {
    label: 'passes src type param',
    scriptArgs: getScriptArgs({ fromType: 'deposit' }),
    handlerArgs: getHandlerArgs({ src: 'deposit' })
  }, {
    label: 'passes dest type param',
    scriptArgs: getScriptArgs({ toType: 'trading' }),
    handlerArgs: getHandlerArgs({ dest: 'trading' })
  }])
})
