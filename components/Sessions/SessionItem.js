import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-mobx';

class SessionItem extends Component {
  render() {
    let session = this.props.session;
    const goToNewSessionScene = () => Actions.session_form(); 

    if (!session) {
      return (
        <View style={{flex: 1, paddingTop: 22}}>
          <TouchableOpacity onPress={goToNewSessionScene}>
            <Text>No Sessions. Press + to create one.</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const goToSessionScene = () => Actions.session({session: this.props.session}); 
    return (
      <View>
        <TouchableOpacity onPress={goToSessionScene}>
          <View>
            <Text>{this.props.session.bps}</Text>
          </View>
          <View>
            <Text>{this.props.session.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SessionItem;
