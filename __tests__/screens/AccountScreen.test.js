import AccountScreen from '../../screens/AccountScreen'
import * as account from '../../services/account'

xdescribe('screens/Account', () => {
  describe('#handlePress', () => {
    it('calls accountService with value', () => {
      account.connect = jest.fn()
      const screen = new AccountScreen()
      screen.state = { value: 'foo' }

      screen.handlePress()

      expect(account.connect).toHaveBeenCalledWith('foo')
    })
  })
})
