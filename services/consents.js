import Config from 'react-native-config'
import axios from 'axios'

export async function get (id) {
  const url = `${Config.OPERATOR_URL}/consents/requests/${encodeURIComponent(id)}`
  const { data: { data } } = await axios.get(url)
  return data
}

export async function approve (consent) {
  const url = `${Config.OPERATOR_URL}/consents/`
  await axios.post(url, consent)
}
