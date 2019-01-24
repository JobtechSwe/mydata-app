import Config from 'react-native-config'
import axios from 'axios'
import JwksClient from './JwksClient'
import { sign, verify } from './crypto'
import { getAccount } from './storage'
import { Base64 } from 'js-base64'

export async function get (id) {
  console.log('consentId', id)
  const account = await getAccount()
  const url = `${Config.OPERATOR_URL}/consents/requests/${encodeURIComponent(id)}?accountId=${account.id}`

  let response
  try {
    response = await axios.get(url)
  } catch (error) {
    console.error('GET', url, error)
    throw error
  }
  const { data: { data, signature, client } } = response

  let signingKey
  const jwksUri = `http://${data.clientId}${client.jwksUrl}`
  try {
    const jwksClient = new JwksClient({ jwksUri })
    signingKey = await jwksClient.getSigningKey('client_key')
  } catch (error) {
    console.error('GET', jwksUri, error)
    throw error
  }

  try {
    if (!await verify(data, signature, signingKey.publicKey || signingKey.rsaPublicKey)) {
      throw new Error('Invalid signature')
    }

    return {
      data: {
        ...data,
        consentRequestId: id
      },
      client
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function approve ({ data, client }) {
  const url = `${Config.OPERATOR_URL}/consents`
  let payload
  try {
    const account = await getAccount()
    const jwksUri = `http://${data.clientId}${client.jwksUrl}`
    const jwksClient = new JwksClient({ jwksUri })
    const encryptionKey = await jwksClient.getEncryptionKey(data.kid)

    const consent = {
      accountId: account.id,
      publicKey: Base64.encode(account.keys.publicKey),
      clientId: data.clientId,
      consentRequestId: data.consentRequestId,
      consentEncryptionKey: Base64.encode(encryptionKey.publicKey || encryptionKey.rsaPublicKey),
      scope: data.scope
    }
    const signature = await sign(consent, account.keys.privateKey)
    payload = { data: consent, signature }
    await axios.post(url, payload)
  } catch (error) {
    console.error('POST', url, payload, error)
    throw error
  }
}
