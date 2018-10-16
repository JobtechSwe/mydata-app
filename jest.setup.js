jest.mock('react-native', () => ({
    AsyncStorage: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn()
      },
    Text: jest.fn(),
    View: jest.fn()
}))

jest.mock('axios')
jest.mock('react-native-config', () => ({
    Config: {}
}))

jest.mock('react-native-paper', () => ({
    TextInput: jest.fn(),
    Button: jest.fn()
}))

console.error = jest.fn()
