import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-mobx';

@observer
class Session extends Component {

  @autobind deleteSession(){
    const session = this.props.session;

    if (session) {
      console.log('Implement delete session');
    }
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
