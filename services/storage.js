import { AsyncStorage } from 'react-native'

export async function getAccount () {
  try {
    const result = await AsyncStorage.getItem('accountId')
    return result
  } catch (error) {
    console.error('Error while getting account-id from AsyncStorage:', error)
    return undefined
  }
}

export async function storeAccountId (id) {
  await AsyncStorage.setItem('accountId', id)
}
