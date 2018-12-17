import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import AccountScreen from './screens/AccountScreen'
import ManageConsentsRequestScreen from './screens/ManageConsentsRequestScreen'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

const stackConfig = {
  initialRouteName: 'Home'
}

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Account: { screen: AccountScreen },
  ManageConsentsRequest: { screen: ManageConsentsRequestScreen }
}, stackConfig)

export default () => (
  <PaperProvider>
    <App/>
  </PaperProvider>
)
