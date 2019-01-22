import { RSA } from 'react-native-rsa-native'
import { sign, verify, encrypt, decrypt } from '../../services/crypto'

describe('services/crypto', () => {
  let keys
  beforeAll(async () => {
    keys = await RSA.generateKeys(1024)
  })
  describe('sign', () => {
    let data
    beforeEach(() => {
      data = {
        foo: 'bar'
      }
    })
    it('returns a well formed signature', async () => {
      const result = await sign(data, keys.private)

      expect(result).toEqual({
        alg: 'RSA-SHA512',
        data: expect.any(String)
      })
    })
    describe('verify', () => {
      it('verifies a correctly signed payload', async () => {
        const signature = await sign(data, keys.private)
        const result = await verify(data, signature, keys.public)

        expect(result).toBe(true)
      })
      it('throws if alg is unsupported', () => {
        return expect(verify(data, { alg: 'RSA-SHA256' }, keys.public))
          .rejects.toThrowError('Unsupported algorithm [RSA-SHA256]. Only [RSA-SHA512] is supported.')
      })
      it('throws if alg is omitted', () => {
        return expect(verify(data, { }, keys.public))
          .rejects.toThrowError('Signature algorithm must be specified. Only [RSA-SHA512] is supported.')
      })
      it('returns false if signature is wrong', async () => {
        const signature = await sign(data, keys.private)
        signature.data = 'herp-derp'
        const result = await verify(data, signature, keys.public)

        expect(result).toBe(false)
      })
      it('returns false if key is wrong', async () => {
        const signature = await sign(data, keys.private)

        const otherKeys = await RSA.generateKeys(1024)
        const result = await verify(data, signature, otherKeys.public)

        expect(result).toBe(false)
      })
    })
  })
  xdescribe('encrypt', () => {
    it('works', () => { })
  })
  xdescribe('decrypt', () => {
    it('works', () => { })
  })
})
