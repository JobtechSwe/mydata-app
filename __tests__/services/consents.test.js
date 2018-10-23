import * as consentService from '../../services/consents'
import axios from 'axios'
import Config from 'react-native-config'

Config.OPERATOR_URL = 'aTotallyLegitOperatorUrl'
jest.useFakeTimers()

describe('consentService', () => {
  describe('#subscribe', () => {
    it('calls axios.get with correct url', () => {
      const desiredURL = 'aTotallyLegitOperatorUrl/accounts/id_software/consents'
      consentService.subscribe('id_software', () => {})
      jest.runOnlyPendingTimers() // trigger polling
      expect(axios.get).toHaveBeenCalledWith(desiredURL)
    })

    it('url-encodes values before using them with axios.get', () => {
      const desiredURL = 'aTotallyLegitOperatorUrl/accounts/b%2F%20%3Da/consents'
      consentService.subscribe('b/ =a', () => {})
      jest.runOnlyPendingTimers() // trigger polling
      expect(axios.get).toHaveBeenCalledWith(desiredURL)
    })
  })

  describe('#approve', () => {
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
