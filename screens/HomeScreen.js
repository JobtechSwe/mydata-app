import React from 'react'
import { Button, Platform, Text, View } from 'react-native'
import Screen from './Screen'
import styled from 'styled-components'
import { getAccount } from '../services/storage'
import { subscribe, approve } from '../services/consents'

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

const ConsentText = styled(Text)`
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
    accountId: undefined,
    instructionText: 'Waiting for consents...',
    pendingConsent: {}
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
    if (accountId) {
      subscribe(accountId, this.onConsentRequest)
    }
  }

  onConsentRequest = async (consent) => {
    this.setState({
      instructionText: 'A new consent is waiting for your approval',
      pendingConsent: consent
    })
  }

  approveConsent = async () => {
    try {
      await approve(this.state.pendingConsent)
      subscribe(this.state.accountId, this.onConsentRequest)
      this.setState({
        instructionText: 'Waiting for consents...',
        pendingConsent: {}
      })
    } catch (error) {
        throw error
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyledView>
        <WelcomeText>Hello {this.state.accountId}</WelcomeText>
        <InstructionText>{this.state.instructionText}</InstructionText>
        {this.state.pendingConsent.id && <ConsentText>Client {this.state.pendingConsent.client_id} says: {this.state.pendingConsent.description}</ConsentText>}
        {this.state.pendingConsent.id && <Button
          title="Approve consent"
          onPress={this.approveConsent}
        />}
      </StyledView>
    );
  }
}
