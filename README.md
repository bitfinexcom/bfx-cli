# Bitfinex Trading CLI Interface

[![Build Status](https://travis-ci.org/f3rno/bfx-cli.svg?branch=master)](https://travis-ci.org/f3rno/bfx-cli)

Thin wrapper around the examples included with [the official Bitfinex Node.JS API library](https://bitfinexcom/bitfinex-api-node) that provides a CLI interface for specifying parameters and rendering of results.

Can be configured with API credentials that are encrypted locally on disk pull or them from the environment.

### Features

* Cross platform (Linux, MacOS, and Windows)
* Uses the official library for all tasks
* **Encrypted** credential storage in `~/.bfxclirc`
* Nearly full API method coverage
  * Data feed streaming
  * Order execution
  * Order & position manipulation
  * Wallet transfers
  * Platform status reporting
  * And more!

### Installation

```bash
npm i -g bfx-cli
```

To configure your API credentials, run `bfx-cli credentials`

### Usage

Run `bfx-cli` from a terminal to see a list of available commands:

```bash
bfx-cli credentials                       Configure API credentials
bfx-cli watch-liquidations                Monitor the liquidations feed
bfx-cli watch-candles <market> <tf>       Monitor a candle feed
bfx-cli watch-trades <market>             Monitor a trade feed
bfx-cli watch-order-book [market]         Render a live order book
bfx-cli margin-info                       Fetch and display margin information
bfx-cli transfer <q> <ccy> <s> <d>        Transfer between wallets
bfx-cli balances                          Fetch and display wallet balances
bfx-cli positions                         Fetch & display all open positions
bfx-cli order-history <market>            Fetch order history
bfx-cli trade-history <market>            Fetch trade history
bfx-cli close [market]                    Close open position(s)
bfx-cli claim [market]                    Claim open position(s)
bfx-cli order                             Submit an order
bfx-cli currencies                        Fetch & display all available currencies
bfx-cli tickers [market]                  Fetch and display one or multiple tickers
bfx-cli cancel                            Cancel all open orders
bfx-cli orders [market]                   Fetch & display all open orders
bfx-cli status                            Query platform status
bfx-cli download-candles <market> <tf>    Download a candle dataset
<count>
bfx-cli download-trades <market> <count>  Download a trade dataset
<to>
```

### Configuring

To configure **bfx-cli**, run `bfx-cli configure` and follow the instructions. Alternatively, you can supply credentials on the environment with the `API_KEY` and `API_SECRET` env variables.

The following *extra* environment variables are supported:

* `WS_URL` - optional Bitfinex WSv2 endpoint URL
* `REST_URL` - optional Bitfinex RESTv2 endpoint URL
* `SOCKS_PROXY_URL` - optional local socksv4 proxy URL to use for both RESTv2 & WSv2 transports

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
