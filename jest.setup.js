import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('AsyncStorage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}))

jest.mock('axios')
jest.mock('react-native-config', () => ({
  Config: {}
}))

jest.mock('react-native-vector-icons/AntDesign', () => jest.fn())
jest.mock('react-native-vector-icons/FontAwesome5', () => jest.fn())

global.btoa = (txt) => Buffer.from(txt, 'utf8').toString('base64')
global.atob = (b64) => Buffer.from(b64, 'base64').toString('utf8')

console.error = jest.fn()
