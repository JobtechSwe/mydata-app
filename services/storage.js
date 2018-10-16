import { AsyncStorage } from 'react-native'

export async function hasAccountOnDevice () {
  try {
    const result = await AsyncStorage.getItem('account-id')
    if (!result) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error('Error while getting account-id from AsyncStorage:', error)
    return false
  }
}

export async function storeAccountId (id) {
  await AsyncStorage.setItem({
    accountId: id
  })
}
