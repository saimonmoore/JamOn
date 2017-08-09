import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class SongItem extends Component {
  onPressSong() {
    console.log('pressed song');
  }

  render() {
    let song = this.props.song;
    const goToNewSongScene = () => {
      console.log('Pressed new song');
      Actions.song_form();
    };

    if (!song) {
      return (
        <View style={{flex: 1, paddingTop: 22}}>
          <TouchableOpacity onPress={goToNewSongScene}>
            <Text>No Songs. Press + to create one.</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const goToSongScene = () => {
      console.log('Pressed go to song scene:', this.props.song);
      Actions.song({ song: this.props.song });
    };
    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        <TouchableOpacity onPress={goToSongScene}>
          <Text>{this.props.song.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SongItem;
