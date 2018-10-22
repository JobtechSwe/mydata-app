import React from 'react'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Screen from './Screen'
import styled from 'styled-components'
import { connect } from '../services/account'

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
  state = {
    value: ''
  }

  handlePress = async () => {
    try {
      const accountId = await connect(this.state.value)
      this.props.navigation.state.params.onAccountStored()
      const { goBack } = this.props.navigation
      goBack(null)
    } catch (error) {
      console.log('could not connect', error)
    }
  }

  render () {
    return (
      <StyledView>
        <InstructionText>Who are you?</InstructionText>
        <TextInput
          label="Account ID"
          onChangeText={(text) => this.setState({value: text})}
          value={this.state.value}
        />
        <Button
          title="Connect"
          onPress={this.handlePress}
          >
          Connect
        </Button>
      </StyledView>
    )
  }
}
