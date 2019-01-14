import * as consentService from '../../services/consents'
import axios from 'axios'
import Config from 'react-native-config'

Config.OPERATOR_URL = 'aTotallyLegitOperatorUrl'
jest.useFakeTimers()

describe('consentService', () => {
  describe('#get', () => {
    let consentRequest, jwks
    beforeEach(() => {
      consentRequest = {
        data: {
          scope: [
            {
              domain: 'localhost:4000',
              area: 'cv',
              description: 'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
              permissions: [
                'write'
              ],
              purpose: 'In order to create a CV using our website.',
              lawfulBasis: 'CONSENT',
              required: true
            }
          ],
          expiry: 1550146999,
          clientId: 'localhost:4000',
          kid: 'enc_20190114122318'
        },
        signature: {
          kid: 'client_key',
          alg: 'RSA-SHA512',
          data: 'rgch6Go3B56tB4UGLJiQAMKofRRmQdoSMp1teXp3Zj8V/ueyxmxbLywbjxuMTT63hfR/0Ueb+YUo60ygeQtL9l1SaT7gZjY56Ft3WASVD5pEVFw863oCr9DqIpm2jMdlUeIT1lZLJ7R1tfETLvy+vk1blaDDswfq46lFYC6OqRA=',
          key: '-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAMcq3gQT5ZpoDr73G5HrQpsvuB+fsgQqdKtfIM5kJLB7mmoOUwxoD+bG\nIrvC+bIHBmtQE+SudYjLtYOjEX3HnoPw2oE7+zNhIlRFOBB2aGlMozWzssJqqfhA\nvDdkZGeS8SfJjo1VjozxA+iQVjjMmU2+Wnw1Z0cY1p3+OZchkqOnAgMBAAE=\n-----END RSA PUBLIC KEY-----\n'
        },
        client: {
          clientId: 'localhost:4000',
          publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAMcq3gQT5ZpoDr73G5HrQpsvuB+fsgQqdKtfIM5kJLB7mmoOUwxoD+bG\nIrvC+bIHBmtQE+SudYjLtYOjEX3HnoPw2oE7+zNhIlRFOBB2aGlMozWzssJqqfhA\nvDdkZGeS8SfJjo1VjozxA+iQVjjMmU2+Wnw1Z0cY1p3+OZchkqOnAgMBAAE=\n-----END RSA PUBLIC KEY-----\n',
          displayName: 'My CV',
          description: 'An app for your CV online',
          jwksUrl: '/jwks',
          eventsUrl: '/events'
        }
      }
      jwks = {
        keys: [
          {
            kid: 'client_key',
            use: 'sig',
            alg: 'RS256',
            kty: 'RSA',
            n: 'AMcq3gQT5ZpoDr73G5HrQpsvuB+fsgQqdKtfIM5kJLB7mmoOUwxoD+bGIrvC+bIHBmtQE+SudYjLtYOjEX3HnoPw2oE7+zNhIlRFOBB2aGlMozWzssJqqfhAvDdkZGeS8SfJjo1VjozxA+iQVjjMmU2+Wnw1Z0cY1p3+OZchkqOn',
            e: 'AQAB'
          },
          {
            kid: 'enc_20190114122318',
            use: 'enc',
            alg: 'RS256',
            kty: 'RSA',
            n: 'AJ0/N5+0PHuaeHppV8coDss06ps73KpqU8G9X0JpYPwfNl3YZyOH/aDCF/hud9F4Fso+DnSzlSHKHVS+7wY3xgwvE9wdLVjHJSC7Lkehw1WMhpYP9D8mShmFWaXJywulL3H01EEGywLN9yZuWbjJ5agedmbxDOJY0cK3OfZHEMFURQ203gTN1U5ZawBykWR7MbwxUf1r78bfk3yagiIo98N1SjWECe1Iecjy1L6nM8z79NrQEUSqc5ROLAAey+M313aHNAHo8tFGkLtaUg+oGljW2JeGLhNuayZ3XAZhCG2sIjkWzf0O5N3ZfhNba9Fdw8yVpyeXzPjH1ZCicthVI7s=',
            e: 'AQAB'
          }
        ]
      }
      axios.get.mockImplementation((url) => {
        if (/\/consents\/requests\//.test(url)) {
          return Promise.resolve({ data: consentRequest })
        } else if (/\/jwks/.test(url)) {
          return Promise.resolve({ data: jwks })
        } else {
          return Promise.reject(Object.assign(new Error(), { status: 404 }))
        }
      })
    })
    it('calls axios.get with correct url', () => {
      consentService.get('abcd')
      expect(axios.get).toBeCalledWith('aTotallyLegitOperatorUrl/consents/requests/abcd')
    })
    it('throws if signature does not verify', () => {
      consentRequest.signature.data = 'b0rk'

      return expect(consentService.get('abcd')).rejects.toThrowError('Invalid signature')
    })
    it('returns data if signature verifies', async () => {
      const result = await consentService.get('abcd')
      expect(result).toEqual({
        data: consentRequest.data,
        client: consentRequest.client
      })
    })
  })
  xdescribe('#approve', () => {
    it('calls axios.put with correct url', () => {
      const consent = {
        account_id: 'foo',
        client_id: 'bar',
        id: 'abc123',
        description: 'Give me data pretty plz'
      }
      consentService.approve(consent)

      expect(axios.put).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents/abc123', {
        account_id: 'foo',
        client_id: 'bar',
        id: 'abc123',
        description: 'Give me data pretty plz',
        status: 'approved'
      })
    })

    it('URI-encodes values before using them in URL with axios.put', () => {
      const consent = {
        id: 'b/ =a'
      }
      consentService.approve(consent)

      expect(axios.put).toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents/b%2F%20%3Da', {
        id: 'b/ =a',
        status: 'approved'
      })
    })
  })
})
