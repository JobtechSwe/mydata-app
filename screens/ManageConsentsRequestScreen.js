import React from 'react'
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Screen from './Screen'
import Scan from '../components/scan'

export default class ManageConsentsRequestScreen extends Screen {
  state = {
    action: 'enter',
    code: ''
  }
  scan = () => {
    this.setState({action: 'scan'})
  }
  onRead = (code) => {
    this.setState({action: 'enter', code})
  }
  render() {
    switch (this.state.action) {
      case 'scan': return (<Scan onRead={this.onRead} />)
      default: return (
        <View>
          <TextInput label="code" value={this.state.code} />
          <Button label="enter" onPress={this.enter}>Enter</Button>
          <Button label="scan" onPress={this.scan}>Scan</Button>
        </View>
      )
    }
  }
}