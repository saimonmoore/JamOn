import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class SongItem extends Component {
  onPressSong() {
    console.log('pressed song');
  }

  render() {
    const song = this.props.song;
    const goToNewSongScene = () => {
      console.log('Pressed new song');
      const { navigate } = this.props.navigation;
      navigate('SongForm', { title: 'New Song' });
    };

    if (!song) {
      return (
        <View style={{ flex: 1, paddingTop: 22 }}>
          <TouchableOpacity onPress={goToNewSongScene}>
            <Text>No Songs. Press + to create one.</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const goToSongScene = () => {
      console.log('Pressed go to song scene:', song);
      const { navigate } = this.props.navigation;
      navigate('Song', { song });
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
