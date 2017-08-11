import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

import { inject, observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';

import SessionPlayer from '../Session/Player';

@observer
@inject('sessions_store')
class Session extends Component {
  static navigationOptions = {
    title: 'Session',
  }

  @autobind deleteSession() {
    const session = this.props.session;

    if (!session) {
      console.log('No session to delete!');
      return;
    }

    const store = this.props.sessions_store;
    store.delete(session);
    // TODO: Delete audio file

    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    const session = this.props.session;

    return (
      <View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Tempo (bpm): {session.tempo}</Text>
        </View>
        <View>
          <Text>Recorded on: {session.createdAt}</Text>
        </View>

        <SessionPlayer session={session} />
        <Button
          onPress={this.deleteSession}
          title="Delete"
          color="#841584"
          accessibilityLabel="Press to delete the session"
        />
      </View>
    );
  }
}

export default Session;
