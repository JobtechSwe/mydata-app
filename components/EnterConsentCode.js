import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, TextInput, withTheme } from 'react-native-paper'
import { parse, unparse } from 'react-native-uuid'
import ScanQRConsentCode from './ScanQRConsentCode'

class EnterConsentCode extends Component {
  state = {
    view: 'enter',
    code: '',
    validated: false
  }

  scan = () => {
    this.setState({ view: 'scan' })
  }
  cancelScan = () => {
    this.setState({ view: 'enter' })
  }
  validate = (code) => {
    return unparse(parse(code)) === code
  }
  
  onChange = (code) => {
    this.setState({ code, validated: this.validate(code) })
    this.props.onCodeChange(code)
  }
  onScanQRCode = (code) => {
    this.setState({ view: 'enter', code })
  }
  enter = () => {
    this.props.onEnterPress()
  }

  render() {
    switch(this.state.view) {
      case 'scan':
        return (
          <View style={{ marginHorizontal: 5, flex: 1 }}>
            <ScanQRConsentCode onRead={this.onScanQRCode} />
            <Button mode="contained" style={{ marginBottom: 5, backgroundColor: this.props.theme.colors.accent }} onPress={this.cancelScan}>Cancel</Button>
          </View>
        )
      case 'enter':
      default:
        return (
          <View style={{ marginHorizontal: 5, flex: 1 }}>
            <TextInput label="code" onChangeText={this.onChange} value={this.state.code} style={{ marginBottom: 5 }} />
            <Button mode="contained" label="enter" onPress={this.enter} disabled={!this.state.validated} style={{ marginBottom: 5 }}>Enter</Button>
            <Button mode="contained" icon="camera" label="scan" onPress={this.scan} style={{ marginBottom: 5, backgroundColor: this.props.theme.colors.accent }}>Scan</Button>
          </View>
        )
    }
  }
}

export default withTheme(EnterConsentCode)
