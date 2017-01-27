import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Song extends Component {
  onPressSong() {
    console.log('pressed song');
  }

  onPressButton() {
    console.log('pressed button');
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <TouchableHighlight onPress={this.onPressSong}>
          <Text>{this.props.song.name}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPressButton}>
          <Text>Button</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Song;
