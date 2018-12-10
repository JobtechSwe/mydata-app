import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import AccountScreen from './screens/AccountScreen'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

const stackConfig = {
  initialRouteName: 'Home'
}

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: RegisterScreen },
  Account: { screen: AccountScreen }
}, stackConfig)

export default () => (
  <PaperProvider>
    <App/>
  </PaperProvider>
)
