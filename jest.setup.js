jest.mock('react-native', () => ({
    AsyncStorage: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn()
      }
}))
