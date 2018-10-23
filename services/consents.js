import Config from 'react-native-config'
import axios from 'axios'

export function subscribe (id, callback) {
  const url = `${Config.OPERATOR_URL}/accounts/${encodeURIComponent(id)}/consents`
  setInterval(async () => {
    try {
      const { data } = await axios.get(url)
      if (data.length > 0) {
        const consent = data[0].data
        if (consent.status === 'pending') {
          callback(consent)
        }
      }
    } catch (error) {
      throw error
    }
  }, 5000)
}

export async function approve (consent) {
  const url = `${Config.OPERATOR_URL}/consents/${encodeURIComponent(consent.id)}`
  consent.status = 'approved'
  await axios.put(url, consent)
}
