import React from 'react'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Screen from './Screen'
import styled from 'styled-components'
import { getAccount, storeAccount } from '../services/storage'

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
  state = {}

  async componentWillFocus () {
    const account = await getAccount()
    this.setState(account)
  }

  updateAccount = async () => {
    storeAccount(this.state)
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <StyledView>
        <InstructionText>Who are you?</InstructionText>
        <TextInput
          label="First name"
          onChangeText={(text) => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <TextInput
          label="Last name"
          onChangeText={(text) => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <Button
          title="Update"
          onPress={this.updateAccount}
          >
          Update
        </Button>
      </StyledView>
    )
  }
}
