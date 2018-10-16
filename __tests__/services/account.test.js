import * as account from '../../services/account'
import * as storage from '../../services/storage'
import axios from 'axios'
import Config from 'react-native-config'

Config.OPERATOR_URL = 'aTotallyLegitOperatorUrl'

describe('account', () => {
  beforeEach(() => {
    storage.storeAccountId = jest.fn()
  })

  describe('#connect', () => {
    it('calls axios.post', async () => {
      const id = 'abc123'

      await account.connect(id)

      expect(axios.post).toHaveBeenCalled()
    })

    it('calls axios.post to correct url and with accountId as payload', async () => {
      const id = 'abc123'

      await account.connect(id)

      expect(axios.post).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/accounts', {
        accountId: id
      })
    })

    it('calls storage.storeAccountId if axios.post resolves', async () => {
      axios.post.mockResolvedValue('payload')
      const id = 'abc123'

      await account.connect(id)

      expect(storage.storeAccountId).toHaveBeenCalled()
    })
  })
})
