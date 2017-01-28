import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Song extends Component {
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <View>
          <Text>{this.props.song.name}</Text>
        </View>
        <View>
          <Text>{this.props.song.author}</Text>
        </View>
        <View>
          <Text>{this.props.song.genre}</Text>
        </View>
      </View>
    );
  }
}

export default Song;