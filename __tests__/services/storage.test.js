import * as storage from '../../services/storage'

describe('storage', () => {
  it('#hasAccountOnDevice is a function', async () => {
    const result = await storage.hasAccountOnDevice()
    expect(result).toEqual(false)
  })
})