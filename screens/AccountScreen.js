import React from 'react'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Screen from './Screen'
import styled from 'styled-components'
import { connect } from '../services/account'

export default class AccountScreen extends Screen {
  render () {
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

    return (
      <StyledView>
        <InstructionText>Who are you?</InstructionText>
        <TextInput
          label="Account ID"
          onChange={this.handleChange}
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

  handlePress () {
    connect(this.state.value)
  }

  handleChange (event) {
    this.this.setState({ value: event.target.value, error: '' })
  }
}
