import Config from 'react-native-config'
import axios from 'axios'
import JwksClient from './JwksClient'
import { RSA } from 'react-native-rsa-native'

export async function get (id) {
  const url = `${Config.OPERATOR_URL}/consents/requests/${encodeURIComponent(id)}`
  const response = await axios.get(url)
  const { data: { data, signature, client } } = response

  console.log(data, signature, client)

  const jwksUri = `http://${data.clientId}${client.jwksUrl}`
  const jwksClient = new JwksClient({ jwksUri })
  const signingKey = await jwksClient.getSigningKey('client_key')
  // const encryptionKey = await jwksClient.getEncryptionKey(data.kid)

  if (!await RSA.verify(signature.data, JSON.stringify(data), signingKey.publicKey || signingKey.rsaPublicKey)) {
    throw new Error('Invalid signature')
  }

  return { data, client }
}

export async function approve (consent) {
  const url = `${Config.OPERATOR_URL}/consents/`
  await axios.post(url, consent)
}
