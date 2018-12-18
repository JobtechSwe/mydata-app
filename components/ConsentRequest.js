import React, { Component } from 'react'
import { View } from 'react-native'
import { Headline, Button, List, Text, withTheme } from 'react-native-paper'
import * as consentsService from '../services/consents'
import * as storage from '../services/storage'

class ConsentRequest extends Component {
  state = {
    view: 'loading',
    consentRequest: null
  }

  async componentDidMount() {
    const consentRequest = await consentsService.get(this.props.consentRequestId)
    this.setState({ consentRequest, view: 'approve'})
  }

  accept = async () => {
    const { id } = storage.getAccount()
    await consentsService.approve({ ...this.state.consentRequest, accountId: id })
  }

  reject = () => {

  }

  render() {
    switch(this.state.view) {
      case 'loading':
        return (
          <View><Text>Loading...</Text></View>
        )
      case 'approve':
        return (
          <View>
            <Text>This app:</Text>
            <Headline>{this.state.consentRequest.client.display_name}</Headline>
            <Text>{this.state.consentRequest.client.description}</Text>
            <Text>Wants these permissions</Text>
            <List.Section>
              {this.state.consentRequest.request.scope.map(scope => <List.Item title={scope} />)}
            </List.Section>
            <Button mode="contained" icon="check-circle" style={{ backgroundColor: this.props.theme.colors.accent }} onPress={this.approve}>I Approve!</Button>
            <Button mode="contained" icon="block" style={{ backgroundColor: this.props.theme.colors.error }} onPress={this.reject}>Nope!</Button>
          </View>
        )
      case 'generating':
          return (<View />)
    }
  }
}

export default withTheme(ConsentRequest)
