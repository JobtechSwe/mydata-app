import React from 'react'
import { Text, View } from 'react-native'
import Screen from './Screen'
import styled from 'styled-components'
import { getAccount, storeAccount } from '../services/storage'
import { RSA } from 'react-native-rsa-native'
import Account from '../components/account'
import GeneratingKeys from '../components/generatingkeys'
import PDS from '../components/pds'

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

export default class AccountScreen extends Screen {
  text = {
    firstName: 'First name',
    lastName: 'Last name',
    create: 'Create',
    update: 'Update'
  }

  state = {
    account: {}
  }

  async componentWillFocus() {
    const account = await getAccount()
    this.setState({
      ...this.state,
      account,
      action: account ? 'update' : 'create'
    })
  }

  saveAccount = async (account) => {
    if (!account.keys) {
      this.setState({ action: 'generating-keys' })
      const ownerKeys = await RSA.generateKeys(4096)
      account.keys = {
        owner: {
          publicKey: ownerKeys.public,
          privateKey: ownerKeys.private
        }
      }
      this.setState({ account, action: 'pds' })
    } else {
      this.setState({ account })
    }

    const { firstName, lastName, keys, pds } = this.state.account
    await storeAccount({ firstName, lastName, keys, pds })

    // this.props.navigation.goBack(null)
  }

  onDropboxConnect = (account) => {
    console.log('onDropboxConnect', account)
    if(this.action === 'pds') {
      this.props.navigation.navigate('Home')
    } else {
      this.setState({ account, action: 'update' })
    }
  }

  currentComponent = () => {
    switch (this.state.action) {
      case 'create':
        return (
          <Account
            account={this.state.account}
            firstName={this.text.firstName}
            lastName={this.text.lastName}
            button={this.text.create}
            onSubmit={(account) => this.saveAccount(account)}
          />
        )
      case 'update':
        return (
          <View>
            <Account
              account={this.state.account}
              firstName={this.text.firstName}
              lastName={this.text.lastName}
              button={this.text.update}
              onSubmit={(account) => this.saveAccount(account)}
            />
            <PDS account={this.state.account} onConnect={this.onDropboxConnect} />
          </View>
        )
      case 'generating-keys':
        return (<GeneratingKeys />)
      case 'pds':
        return (<PDS account={this.state.account} onConnect={this.onDropboxConnect} />)
    }
  }

  render() {
    return (
      <StyledView>
        <InstructionText>Account</InstructionText>
        {this.currentComponent()}
      </StyledView>
    )
  }
}
