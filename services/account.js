import axios from 'axios'
import Config from 'react-native-config'
import { sign } from './crypto'

async function pluckAndSign (account) {
  const data = pluck(account)
  const signature = await sign(data, account.keys.privateKey)

  return {
    data,
    signature
  }
}

function pluck (account) {
  const data = {
    firstName: account.firstName,
    lastName: account.lastName,
    publicKey: btoa(account.keys.publicKey),
    pds: {
      provider: 'dropbox',
      access_token: account.pds.access_token
    }
  }
  return data
}

export async function register (account) {
  const payload = await pluckAndSign(account)
  const { data: { data: { id } } } = await axios.post(`${Config.OPERATOR_URL}/accounts`, payload)
  return id
}

export async function update (account) {
  const payload = await pluckAndSign(account)
  await axios.put(`${Config.OPERATOR_URL}/accounts/${account.id}`, payload)
}

export async function save (account) {
  if (account.id) {
    await update(account)
  } else {
    account.id = await register(account)
  }
  return account
}
