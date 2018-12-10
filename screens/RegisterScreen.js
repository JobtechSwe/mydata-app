import React from 'react'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Screen from './Screen'
import styled from 'styled-components'
import {storeAccount} from '../services/storage'
import { RSA } from 'react-native-rsa-native'

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
    firstName: '',
    lastName: '',
    busy: false
  }

  handlePress = async () => {
    this.setState({busy: true})
    const ownerKeys = await RSA.generateKeys(4096)
    this.setState({ busy: false })

    this.setState({ keys: { owner: { publicKey: ownerKeys.public, privateKey: ownerKeys.private}}})
    const {firstName, lastName, keys} = this.state
    await storeAccount({ firstName, lastName, keys })
    this.props.navigation.state.params.onAccountStored()
    this.props.navigation.goBack(null)
  }

  render() {
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
          title="Create"
          onPress={this.handlePress}
        >
          Create
        </Button>
      </StyledView>
    )
  }
}
