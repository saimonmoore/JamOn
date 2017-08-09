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
import { Actions } from 'react-native-router-flux';
import Sessions from '../Sessions';

@observer
class Song extends Component {

  @autobind editSong(){
    const song = this.props.song;

    if (song) {
      Actions.song_form({song: song}); 
    }
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <View>
          <Text style={{fontWeight: 'bold'}}>{this.props.song.name}</Text>
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
          <Text style={{textDecorationLine: 'underline', color: 'red'}}>Jammin's</Text>
        </View>
        <Sessions song={this.props.song} />
      </View>
    );
  }
}

export default Song;
