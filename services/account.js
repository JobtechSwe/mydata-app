import axios from 'axios'
import Config from 'react-native-config'
import * as storage from './storage'

export async function connect (id) {
  await axios.post(`${Config.OPERATOR_URL}/accounts`, {
    accountId: id
  })

  await storage.storeAccountId(id)
}
