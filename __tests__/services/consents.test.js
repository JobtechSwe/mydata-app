import * as consentService from '../../services/consents'
import axios from 'axios'
import Config from 'react-native-config'

Config.OPERATOR_URL = 'aTotallyLegitOperatorUrl'

describe('consentService', () => {
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
  })
})
