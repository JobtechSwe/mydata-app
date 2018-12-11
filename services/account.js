import axios from 'axios'
import Config from 'react-native-config'
import { storeAccount } from './storage'

function pluck(account) {
  const data = {
    firstName: account.firstName,
    lastName: account.lastName,
    publicKey: account.keys.publicKey,
    pds: account.pds
  }
  if (account.id) {
    data.id = account.id
  }
  return data
}

export async function register (account) {
  const {data: {id}} = await axios.post(`${Config.OPERATOR_URL}/accounts`, pluck(account))
  return id
}

export async function update (account) {
  await axios.put(`${Config.OPERATOR_URL}/accounts/${account.id}`, pluck(account))
}

export async function save (account) {
  if (account.id) {
    await update(account)
  } else {
    account.id = await register(account)
  }
  return account
}
