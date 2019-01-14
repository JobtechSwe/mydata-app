import { createSign, createVerify } from 'crypto'

export const RSA = {
  generateKeys: jest.fn(),
  sign: jest.fn((data, privateKey) => {
    return Promise.resolve(createSign('RSA-SHA512').update(data).sign(privateKey, 'base64'))
  }),
  verify: jest.fn((data, secretToVerify, key) => {
    return Promise.resolve(createVerify('RSA-SHA512')
      .update(secretToVerify)
      .verify(key, data, 'base64'))
  })
}
