/**
 * @format
 * @flow
 */
import { createStackNavigator, StackNavigatorConfig, NavigationTransitionProps } from 'react-navigation';
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'

const stackConfig: StackNavigatorConfig = {}

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
}, stackConfig)

export default App;
