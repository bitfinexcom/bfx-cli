'use strict'

const os = require('os')
const fs = require('fs')
const colors = require('colors')
const _isEmpty = require('lodash/isEmpty')
const { Password, Form, Confirm } = require('enquirer')
const cmdHandler = require('../cmd_handler')
const { RC_FILENAME } = require('../load_config')
const encryptCredentials = require('../encrypt_credentials')

module.exports = {
  command: 'credentials',
  describe: 'Configure API credentials',
  handler: cmdHandler(async (argv) => {
    let prompt

    if (process.env.BFX_CLI_CREDENTIALS_LOADED) {
      prompt = new Confirm({
        name: 'delete-confirm',
        message: 'API credentials are configured; do you want to delete them?'
      })

      const deleteConfirmation = await prompt.run()

      if (!deleteConfirmation) {
        return
      } else {
        console.log('')
      }

      try {
        fs.unlinkSync(`${os.homedir()}/${RC_FILENAME}`)
        console.log('Deleted ~/%s', RC_FILENAME)
      } catch (e) {
        console.error('Failed to delete ~/%s: %s', RC_FILENAME, e.message)
      }

      return
    }

    prompt = new Confirm({
      name: 'setup-confirm',
      message: 'Would you like to store your API credentials?'
    })

    const setupConfirmation = await prompt.run()

    if (!setupConfirmation) {
      return
    }

    let setupData = {}

    while (_isEmpty(setupData.apiKey) || _isEmpty(setupData.apiSecret)) {
      prompt = new Form({
        name: 'setup-form',
        message: 'Fill in your credentials below:',
        choices: [{
          name: 'apiKey',
          message: 'API Key',
          initial: ''
        }, {
          name: 'apiSecret',
          message: 'API Secret',
          initial: ''
        }]
      })

      setupData = await prompt.run()
    }

    prompt = new Confirm({
      name: 'encrypt-confirm',
      message: 'Do you want to encrypt your credentials with a password? You will be prompted for the password every time you run bfx-cil:'
    })

    const encryptConfirmation = await prompt.run()

    let key
    let secret
    let control

    if (!encryptConfirmation) {
      key = setupData.apiKey
      secret = setupData.apiSecret
    } else {
      prompt = new Password({
        name: 'encrypt-password',
        message: 'Enter your password:'
      })

      const password = await prompt.run()
      const encryptedData = await encryptCredentials({
        key: setupData.apiKey,
        secret: setupData.apiSecret,
        salt: 'SALT',
        password
      })

      key = encryptedData.key
      secret = encryptedData.secret
      control = encryptedData.control
    }

    try {
      fs.writeFileSync(`${os.homedir()}/${RC_FILENAME}`, JSON.stringify({
        key,
        secret,
        control,
        encrypted: !!control
      }))
    } catch (e) {
      console.error('Failed to save credentials: %s', e.message)
    }

    console.log(colors.green('Done!'))
  })
}
