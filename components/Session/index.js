import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

import { inject, observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';
import { Actions } from 'react-native-router-flux';

import SessionPlayer from '../Session/Player';

@observer
@inject('sessions_store')
class Session extends Component {
  @autobind deleteSession() {
    const session = this.props.session;

    if (!session) {
      console.log('No session to delete!');
      return;
    }

    const store = this.props.sessions_store;
    store.delete(session);
    // TODO: Delete audio file
    Actions.pop();
  }

  render() {
    const session = this.props.session;

    return (
      <View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Beats per second: {session.bps}</Text>
        </View>
        <View>
          <Text>Recorded on: {session.date}</Text>
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
