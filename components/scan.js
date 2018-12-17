import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class Account extends Component {
  state = {
    code: ''
  }

  render() {
    return (
      <View>
        <QRCodeScanner
          onRead={(event) => this.props.onRead(event.data)}
          showMarker={true}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('default', () => Account)
