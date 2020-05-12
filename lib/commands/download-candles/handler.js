'use strict'

const fs = require('fs')
const { TIME_FRAME_WIDTHS } = require('bfx-hf-util')
const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')
const debug = require('../../debug')('>')
const marketParam = require('../../params/market')
const numberParam = require('../../params/number')
const stringParam = require('../../params/string')
const tfParam = require('../../params/tf')

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
  const count = numberParam('count', argv.count)
  const tf = tfParam('time frame', argv.tf)

  const data = {}
  const start = Date.now()
  let attemptedFetchOf = 0 // likely more than truly fetched, no 0 vol candles
  let end = Date.now()

  debug('downloading %d candles for market %s:%s', count, market, tf)

  while (attemptedFetchOf < count) {
    const fetchCount = Math.min(REQ_LIMIT, count)
    const candles = await pt.add(rest.candles.bind(rest, {
      timeframe: tf,
      symbol: market,
      section: 'hist',
      query: {
        limit: REQ_LIMIT,
        sort: 1,
        start: end - (fetchCount * TIME_FRAME_WIDTHS[tf]),
        end
      }
    }))

    candles.forEach((c) => {
      data[c.mts + ''] = c
    })

    debug(
      'read %d candles (to %s)', REQ_LIMIT, new Date(end).toLocaleString()
    )

    const timestamps = Object.keys(data).map(k => +k)
    timestamps.sort()
    end = timestamps[0]

    attemptedFetchOf += fetchCount
  }

  debug('downloaded %d candles', Object.keys(data).length)

  const dataArr = Object.values(data)
  dataArr.sort((a, b) => a.mts - b.mts)

  const serializedData = dataArr.map(c => c.serialize())
  const filename = output || `bfx-candles-${market}-${tf}-${start}-${end}.json`

  fs.writeFileSync(filename, JSON.stringify(serializedData))

  debug('wrote data to %s', filename)
}
