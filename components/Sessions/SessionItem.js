import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';

class SessionItem extends Component {
  render() {
    const session = this.props.session;
    const song = this.props.song;
    const createdAt = moment.unix(session.createdAt).format('YY-MM-DD HH:mm:ss Z');
    const { navigate } = this.props.navigation;
    const goToNewSessionScene = () => navigate('SessionForm', {});

    if (!session) {
      return (
        <View style={{ flex: 1, paddingTop: 22 }}>
          <TouchableOpacity onPress={goToNewSessionScene}>
            <Text>No Sessions. Press + to create one.</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const goToSessionScene = () => navigate('Session', { session, song });

    return (
      <View>
        <TouchableOpacity onPress={goToSessionScene}>
          <View>
            <Text>{session.duration} seconds @ {session.tempo} bpm - {createdAt}</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SessionItem;
