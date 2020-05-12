'use strict'

const fs = require('fs')
const os = require('os')
const { Password } = require('enquirer')
const _isString = require('lodash/isString')
const _isObject = require('lodash/isObject')
const _isEmpty = require('lodash/isEmpty')
const printMessage = require('print-message')
const decryptCredentials = require('./decrypt_credentials')
const wrapError = require('./util/wrap_error')
const log = require('./util/log')

const RC_FILENAME = '.bfxclirc'

const loadConfig = async () => {
  if (!_isEmpty(process.env.API_KEY) && !_isEmpty(process.env.API_SECRET)) {
    log('Loaded credentials from environment'.green)

    return {
      key: process.env.API_KEY,
      secret: process.env.API_SECRET
    }
  }

  const rcPath = `${os.homedir()}/${RC_FILENAME}`

  try {
    const rcFile = fs.readFileSync(rcPath, 'utf-8')
    let rcContents

    try {
      rcContents = JSON.parse(rcFile)
    } catch (e) {
      log('Failed to parse ~/%s as JSON: %s', RC_FILENAME.red, e)
      throw e // caught below
    }

    if (!_isObject(rcContents)) {
      throw new Error('Malformed rc file, contents not a JSON object')
    }

    const {
      encrypted,
      control,
      key: rawKey,
      secret: rawSecret
    } = rcContents

    if (
      (!_isString(rawKey) || _isEmpty(rawKey)) ||
      (!_isString(rawSecret) || _isEmpty(rawSecret)) ||
      (encrypted && (!_isString(control) || _isEmpty(control)))
    ) {
      throw new Error(
        `Empty or malformed content in ~/${RC_FILENAME}; run 'bfx-cli credentials' to repair`
      )
    }

    if (!encrypted) {
      return {
        key: rawKey,
        secret: rawSecret
      }
    }

    const prompt = new Password({
      name: 'password',
      message: 'Enter your credentials password:'
    })

    const password = await prompt.run()

    log()

    if (_isEmpty(password)) {
      throw new Error('Credentials are encrypted and no password was provided')
    }

    const decrypted = await decryptCredentials({
      secret: rawSecret,
      key: rawKey,
      password,
      control
    })

    log('loaded credentials from %s', RC_FILENAME.green)
    log()

    return {
      key: decrypted.key,
      secret: decrypted.secret
    }
  } catch (e) {
    printMessage([
      wrapError(e),
      '',
      `Could not load credentials from env or ~/${RC_FILENAME.red}`
    ])

    log()

    return {}
  }
}

module.exports = loadConfig
module.exports.RC_FILENAME = RC_FILENAME
