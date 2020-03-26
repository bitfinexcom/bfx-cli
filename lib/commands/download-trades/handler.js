'use strict'

const fs = require('fs')
const _last = require('lodash/last')
const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')
const chrono = require('chrono-node')
const debug = require('../../debug')('>')
const marketParam = require('../../params/market')
const stringParam = require('../../params/string')

const REQ_LIMIT = 1000
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0,
  promiseImplementation: Promise
})

/**
  * Downloads the requested number of candles from a market identified by
  * symbol/timeframe pair.
  */
module.exports = async (argv) => {
  const rest = new RESTv2({ transform: true })
  const output = stringParam('output', argv.output, true)
  const market = marketParam('market', argv.market)
  const to = stringParam('to', argv.to)
  const toDate = chrono.parseDate(to)
  const trades = []
  const start = Date.now()
  let lastTradeMTS = +toDate

  if (!+isFinite(+toDate)) {
    throw new Error('given invalid \'to\' date')
  } else if (+toDate > start) {
    throw new Error('given \'to\' date in the future')
  }

  debug('downloading historical trades up to %s', toDate.toString())

  while (lastTradeMTS < start) {
    const data = await pt.add(rest.trades.bind(
      rest, market, lastTradeMTS, start, REQ_LIMIT, 1
    ))

    if (data.length === 0) {
      break // reached current time or close enough for there to be no trades
    }

    debug(
      'fetched %d trades up to %s',
      data.length, new Date(lastTradeMTS).toLocaleString()
    )

    trades.unshift(...data)
    lastTradeMTS = _last(data).mts + 1 // offset to avoid fetching same trade
  }

  const filename = output || `trades-${market}-${+toDate}-${start}.json`

  fs.writeFileSync(filename, JSON.stringify(trades.map(t => t.serialize())))

  debug('wrote %d trades to %s', trades.length, filename)
}
