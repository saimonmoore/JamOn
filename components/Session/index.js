import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { inject, observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-mobx';

@inject('sessions_store')
@observer
class Session extends Component {

  @autobind deleteSession(){
    const session = this.props.session;

    if (!session) {
      console.log('No session to delete!');
      return;
    }

    const store = this.props.sessions_store;
    store.delete(session);
    Actions.pop();
  }

  playSession() {
    console.log('playing session recording');
  }

  render() {
    return (
      <View>
        <View>
          <Text style={{fontWeight: 'bold'}}>Beats per second: {this.props.session.bps}</Text>
        </View>
        <View>
          <Text>Recorded on: {this.props.session.date}</Text>
        </View>
        <TouchableHighlight onPress={this.playSession}>
          <View>
            <Text>Play Session</Text>
          </View>
        </TouchableHighlight>
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
