import Config from 'react-native-config'
import axios from 'axios'
import JwksClient from './JwksClient'
import { RSA } from 'react-native-rsa-native'
import { sign, verify } from './crypto'
import { getAccount } from './storage'

export async function get (id) {
  const account = await getAccount()
  const url = `${Config.OPERATOR_URL}/consents/requests/${encodeURIComponent(id)}?accountId=${account.id}`
  const response = await axios.get(url)
  const { data: { data, signature, client } } = response

  const jwksUri = `http://${data.clientId}${client.jwksUrl}`
  const jwksClient = new JwksClient({ jwksUri })
  const signingKey = await jwksClient.getSigningKey('client_key')

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
}

export async function approve ({ data, client }) {
  const account = await getAccount()
  const jwksUri = `http://${data.clientId}${client.jwksUrl}`
  const jwksClient = new JwksClient({ jwksUri })

  const encryptionKey = await jwksClient.getEncryptionKey(data.kid)

  const url = `${Config.OPERATOR_URL}/consents`
  const consent = {
    accountId: account.id,
    accountKey: btoa(account.keys.publicKey),
    consentId: data.consentRequestId,
    consentEncryptionKey: btoa(encryptionKey.publicKey || encryptionKey.rsaPublicKey),
    scope: []
  }
  const signature = await sign(consent, account.keys.privateKey)
  await axios.post(url, { data: consent, signature })
}
