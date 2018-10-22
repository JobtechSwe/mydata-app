import * as storage from '../../services/storage'
import { AsyncStorage } from 'react-native'

describe('storage', () => {
  describe('#getAccount', () => {
    it('calls AsyncStorage.getItem', async () => {
      await storage.getAccount()
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('accountId')
    })

    it('resolves if AsyncStorage resolves', async () => {
      AsyncStorage.getItem.mockResolvedValue('myId')
      const result = await storage.getAccount()
      expect(result).toEqual('myId')
    })

    it('resolves with undefined if AsyncStorage rejects', async () => {
      AsyncStorage.getItem.mockRejectedValue('could not find any account-id')
      const result = await storage.getAccount()
      expect(result).toEqual(undefined)
    })
  })

  describe('#storeAccountId', () => {
    it('calls AsyncStorage.setItem', async () => {
      await storage.storeAccountId('foo')

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('accountId', 'foo')
    })
  })
})
