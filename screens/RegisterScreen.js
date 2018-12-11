import React from 'react'
import { Text, View } from 'react-native'
import Screen from './Screen'
import styled from 'styled-components'
import {getAccount, storeAccount} from '../services/storage'
import { RSA } from 'react-native-rsa-native'
import { Account, GeneratingKeys } from '../components/account-view'

const InstructionText = styled(Text)`
text-align: center;
color: #333;
margin-bottom: 6px;
`

const StyledView = styled(View)`
flex: 1;
justify-content: center;
background-color: #F5FCFF;
`

export default class RegisterScreen extends Screen {
  state = {
    account: {}
  }

  text = {
    firstName: 'First name',
    lastName: 'Last name',
    create: 'Create',
    update: 'Update'
  }

  async componentWillFocus() {
    const account = await getAccount()
    this.setState({action: account ? 'update' : 'create'})
    this.setState({...this.state, account})
  }

  saveAccount = async (account) => {
    this.setState({account, action: 'generating-keys'})
    const ownerKeys = await RSA.generateKeys(4096)
    this.setState({
      busy: false,
      account: {
        ...account,
        keys: {
          owner: {
            publicKey: ownerKeys.public,
            privateKey: ownerKeys.private
          }
        }
      }
    })

    const {firstName, lastName, keys} = this.state
    await storeAccount({ firstName, lastName, keys })
    this.props.navigation.state.params.onAccountStored()
    this.props.navigation.goBack(null)
  }

  currentComponent = () => {
    switch (this.state.action) {
      case 'create':
      case 'edit':
        return (
          <Account
            account={this.state.account}
            firstName={this.text.firstName}
            lastName={this.text.lastName}
            button={this.state.action === 'create' ? this.text.create : this.text.update}
            onSubmit={(account) => this.saveAccount(account)}
          />
        )
      case 'generating-keys':
        return (<GeneratingKeys />)
    }
  }

  render() {
    return (
      <StyledView>
        <InstructionText>Who are you?</InstructionText>
        { this.currentComponent() }
      </StyledView>
    )
  }
}
