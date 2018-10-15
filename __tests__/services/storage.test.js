import * as storage from '../../services/storage'
import { AsyncStorage } from 'react-native'

describe('storage', () => {
  describe("#hasAccountOnDevice", () => {
    it('calls AsyncStorage.getItem', async () => {
      await storage.hasAccountOnDevice()
      expect(AsyncStorage.getItem).toHaveBeenCalled()
    })

    it('resolves if AsyncStorage resolves', async () => {
      AsyncStorage.getItem.mockResolvedValue('this worked!')
      const result = await storage.hasAccountOnDevice()
      expect(result).toEqual(true)
    })

    it('rejects if AsyncStorage rejects', async () => {
      AsyncStorage.getItem.mockRejectedValue('could not find any account-id')
      const result = await storage.hasAccountOnDevice()
      expect(result).toEqual(false)
    })
  })
})