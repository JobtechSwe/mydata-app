import { AsyncStorage } from 'react-native'

export async function hasAccountOnDevice () {
  try {
    const result = await AsyncStorage.getItem('account-id')
    return true
  } catch (error) {
    return false
  }
}