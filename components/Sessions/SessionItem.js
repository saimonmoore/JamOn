import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class SessionItem extends Component {
  render() {
    const session = this.props.session;
    const { navigate } = this.props.navigation;
    const goToNewSessionScene = () => navigate('SessionForm', { title: 'New Session' });

    if (!session) {
      return (
        <View style={{ flex: 1, paddingTop: 22 }}>
          <TouchableOpacity onPress={goToNewSessionScene}>
            <Text>No Sessions. Press + to create one.</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const goToSessionScene = () => navigate('SessionForm', { session, title: session.bps });

    return (
      <View>
        <TouchableOpacity onPress={goToSessionScene}>
          <View>
            <Text>{session.bps}</Text>
          </View>
          <View>
            <Text>{session.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SessionItem;
