import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Screen from './Screen'
import styled from 'styled-components'

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
  render() {
    return (
      <StyledView>
        <InstructionText>Who are you?</InstructionText>
        <TextInput
          label="Account ID"
        />
        <Button
          title="Goto Account"
          onPress={() => navigate('Account')}
        />
      </StyledView>
    )
  }
}
