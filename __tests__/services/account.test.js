import * as accountService from '../../services/account'
import axios from 'axios'
import Config from 'react-native-config'

Config.OPERATOR_URL = 'aTotallyLegitOperatorUrl'

describe('account', () => {
  let account
  beforeEach(() => {
    account = {
      id: 'abc123',
      firstName: 'Foo',
      lastName: 'Bar',
      pds: {
        access_token: 'abc'
      },
      keys: {
        publicKey: 'public',
        privateKey: 'private'
      }
    }
  })

  describe('#register', () => {
    beforeEach(() => {
      account.id = undefined
      axios.post.mockResolvedValue({ data: { data: { id: 'abc123' } } })
    })
    it('calls axios.post', async () => {
      await accountService.register(account)

      expect(axios.post).toHaveBeenCalled()
    })
    it('calls axios.post to correct url and with parts of account as payload', async () => {
      await accountService.register(account)

      const expected = {
        data: {
          firstName: account.firstName,
          lastName: account.lastName,
          publicKey: account.keys.publicKey,
          pds: {
            provider: 'dropbox',
            access_token: account.pds.access_token
          }
        },
        signature: expect.any(String)
      }
      expect(axios.post).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/accounts', expected)
    })
    it('returns id axios.post resolves', async () => {
      const id = await accountService.register(account)

      expect(id).toEqual('abc123')
    })
  })

  describe('#update', () => {
    beforeEach(() => {
      axios.put.mockResolvedValue({})
    })
    it('calls axios.put', async () => {
      await accountService.update(account)

      expect(axios.put).toHaveBeenCalled()
    })
    it('calls axios.put to correct url and with parts of account as payload', async () => {
      await accountService.update(account)

      const expected = {
        data: {
          firstName: account.firstName,
          lastName: account.lastName,
          publicKey: account.keys.publicKey,
          pds: {
            provider: 'dropbox',
            access_token: account.pds.access_token
          }
        },
        signature: expect.any(String)
      }
      expect(axios.put).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/accounts/abc123', expected)
    })
  })

  describe('#save', () => {
    beforeEach(() => {
      axios.post.mockResolvedValue({ data: { data: { id: 'abc123' } } })
      axios.put.mockResolvedValue({})
    })
    describe('existing user', () => {
      it('calls axios.put to correct url and with parts of account as payload', async () => {
        await accountService.save(account)

        const expected = {
          data: {
            firstName: account.firstName,
            lastName: account.lastName,
            publicKey: account.keys.publicKey,
            pds: {
              provider: 'dropbox',
              access_token: account.pds.access_token
            }
          },
          signature: expect.any(String)
        }
        expect(axios.put).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/accounts/abc123', expected)
      })
      it('returns account', async () => {
        const result = await accountService.save(account)

        expect(result).toEqual(account)
      })
    })
    describe('new user', () => {
      beforeEach(() => {
        account.id = undefined
      })
      it('calls axios.post to correct url and with parts of account as payload', async () => {
        await accountService.save(account)

        const expected = {
          data: {
            firstName: account.firstName,
            lastName: account.lastName,
            publicKey: account.keys.publicKey,
            pds: {
              provider: 'dropbox',
              access_token: account.pds.access_token
            }
          },
          signature: expect.any(String)
        }
        expect(axios.post).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/accounts', expected)
      })
      it('returns account', async () => {
        const result = await accountService.save(account)

        expect(result).toEqual(account)
      })
    })
  })
})
