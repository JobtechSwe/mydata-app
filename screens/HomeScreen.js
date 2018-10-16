import React from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import Screen from './Screen'
import styled from 'styled-components'
import { hasAccountOnDevice } from '../services/storage'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const WelcomeText = styled(Text)`
  font-size: 20px;
  text-align: center;
  margin: 10px;
`

const InstructionText = styled(Text)`
  text-align: center;
  color: #333;
  margin-bottom: 6px;
`

const StyledView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
`

export default class HomeScreen extends Screen {
  async componentWillMount() {
    const hasAccount = await hasAccountOnDevice()
    const { navigate } = this.props.navigation;
    if (!hasAccount) navigate('Account')
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyledView>
        <WelcomeText>Home</WelcomeText>
        <InstructionText>{instructions}</InstructionText>
        <Button
          title="Goto Account"
          onPress={() => navigate('Account')}
        />
      </StyledView>
    );
  }
}
