import axios from 'axios'
import Config from 'react-native-config'
import { RSA } from 'react-native-rsa-native'

function pluckAndSign(account) {
  const data = pluck(account)
  const signature = RSA.sign(JSON.stringify(data), account.keys.privateKey)
  return {
    data,
    signature
  }
}

function pluck(account) {
  const data = {
    firstName: account.firstName,
    lastName: account.lastName,
    publicKey: account.keys.publicKey,
    pds: {
      provider: 'dropbox',
      access_token: account.pds.access_token
    }
  }
  return data
}

export async function register (account) {
  const { data: { id } } = await axios.post(`${Config.OPERATOR_URL}/accounts`, pluckAndSign(account))
  return id
}

export async function update (account) {
  await axios.put(`${Config.OPERATOR_URL}/accounts/${account.id}`, pluckAndSign(account))
}

export async function save (account) {
  if (account.id) {
    await update(account)
  } else {
    account.id = await register(account)
  }
  return account
}
