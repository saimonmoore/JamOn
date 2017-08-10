import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

import { observer } from 'mobx-react/native';
import autobind from 'autobind-decorator';
import Sessions from '../Sessions';

@observer
class Song extends Component {
  @autobind editSong() {
    const song = this.props.song;
    const { navigate } = this.props.navigation;

    if (song) {
      navigate('SongForm', { song });
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{this.props.song.name}</Text>
        </View>
        <View>
          <Text>{this.props.song.author}</Text>
        </View>
        <View>
          <Text>{this.props.song.genre}</Text>
        </View>
        <Button
          onPress={this.editSong}
          title="Edit"
          color="#841584"
          accessibilityLabel="Press to edit the song"
        />
        <View>
          <Text style={{ textDecorationLine: 'underline', color: 'red' }}>JamOn Sessions</Text>
        </View>
        <Sessions song={this.props.song} navigation={navigation} />
      </View>
    );
  }
}

export default Song;
