import { Linking } from 'react-native'
import Config from 'react-native-config'
import { getAccount, storeAccount } from './storage'
import EventEmitter from 'eventemitter3'

function processQueryString(qs) {
  return unescape(qs)
    .split('&')
    .map(kv => kv.split('='))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
}

class DropboxConnector extends EventEmitter {

  constructor() {
    super()
    this.connect = this.connect.bind(this)
    this.handleUrl = this.handleUrl.bind(this)
  }

  async connect() {
    Linking.addEventListener('url', this.handleUrl)

    const url = `https://api.dropbox.com//oauth2/authorize?response_type=token&client_id=${Config.DROPBOX_KEY}&redirect_uri=mydata://callback/dropbox`
    await Linking.openURL(url)
    
    return this
  }

  async handleUrl(event) {
    Linking.removeEventListener('url', this.handleUrl)

    const [, queryString] = event.url.match(/\#(.*)/)
    const dropbox = processQueryString(queryString)
    const account = await getAccount()
    account.pds = account.pds || {}
    account.pds.dropbox = dropbox
    await storeAccount(account)

    this.emit('connect', account)
  }
}

export default new DropboxConnector()
