import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-mobx';

class Song extends Component {
  onPressSong() {
    console.log('pressed song');
  }

  render() {
    const goToSongScene = () => Actions.song({song: this.props.song}); 
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <TouchableOpacity onPress={goToSongScene}>
          <Text>{this.props.song.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Song;
