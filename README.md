# Bitfinex Trading CLI Interface

[![Build Status](https://travis-ci.org/f3rno/bfx-cli.svg?branch=master)](https://travis-ci.org/f3rno/bfx-cli)

> WIP, relies in black magic coming soon to `bitfinex-api-node`

Thin wrapper around the examples included with [the official Bitfinex Node.JS API library](https://bitfinexcom/bitfinex-api-node) that provides a CLI interface for specifying parameters and rendering of results.

Can be configured with API credentials that are encrypted locally on disk, pull them from the environment, or from an unencrypted `.bfx-cli-env` file in the working or home (~) directory.

### Features

* uses the official library for all tasks
* encrypted credential storage

### TODO

* [ ] Encrypted API credential support (env/disk)
* [ ] Add support for all existing examples

### Installation

```bash
npm i -g bfx-cli
```

### Usage (WIP)

* `bfx-cli --help`
* `bfx-cli balances --ccy USD --type trading`
* `bfx-cli orders`
* `bfx-cli cancel-order --id 1234`
* `bfx-cli cancel-all-orders`
* `bfx-cli submit-order LEO/USD -42 @ 2`
* `bfx-cli close-all-positions`
* and more!

### Configuring (WIP)

There are three options for configuring `bfx-cli`:

* Include relevant values in the environment when invoking `bfx-cli`
* Run `bfx-cli init` to create an encrypted `.bfx-cli-env` file in your home directory
* Create a plaintext `.bfx-cli-env` file in your home directory manually

Regardless of the method utilized, the available options are the same in all cases:

* `API_KEY` - required for commands accessing private data
* `API_SECRET` - required for commands accessing private data
* `WS_URL` - optional Bitfinex WSv2 endpoint URL
* `REST_URL` - optional Bitfinex RESTv2 endpoint URL
* `SOCKS_PROXY_URL` - optional local socksv4 proxy URL to use for both RESTv2 & WSv2 transports

### Sample Output (WIP)

![bfx-cli positions -pl](https://github.com/f3rno/bfx-cli/raw/master/readme_assets/positions_screenie.png)

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
