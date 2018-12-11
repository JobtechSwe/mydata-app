import React, { Component } from 'react'
import { View } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'

export class Account extends Component {

  state = {
    firstName: '',
    lastName: ''
  }

  render () {
    return (
      <View>
        <TextInput
          label={this.props.firstName}
          onChangeText={(text) => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <TextInput
          label={this.props.lastName}
          onChangeText={(text) => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <Button
          title={this.props.button}
          onPress={() => this.props.onSubmit(this.state)}
        >
          {this.props.button}
        </Button>
      </View>
    )
  }
}

export class GeneratingKeys extends Component {
  render() {
    return (
      <Text label="Generating keys">Generating keys</Text>
    )
  }
}
