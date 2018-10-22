import React from 'react'
import { Button, Platform, Text, View } from 'react-native'
import Screen from './Screen'
import styled from 'styled-components'
import { getAccount } from '../services/storage'

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
  state = {
    accountId: undefined
  }

  async componentWillMount() {
    await this.readAccountFromStorage()

    const { navigate } = this.props.navigation
    if (!this.state.accountId) navigate('Account', { onAccountStored: this.readAccountFromStorage })
  }

  readAccountFromStorage = async () => {
    const accountId = await getAccount()
    this.setState({
      accountId
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyledView>
        <WelcomeText>Hello {this.state.accountId}</WelcomeText>
        <InstructionText>Waiting for consents</InstructionText>
        <Button
          title="Goto Account"
          onPress={() => navigate('Account')}
        />
      </StyledView>
    );
  }
}
