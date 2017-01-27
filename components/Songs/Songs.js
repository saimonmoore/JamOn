import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-mobx';

import SongItem from './SongItem';

class Songs extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.songs)
    };
  }
  render() {
    const newSongNavigation = () => Actions.new_song(); 

    return (
      <View style={{flex: 1, paddingTop: 22, justifyContent: 'space-between'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <SongItem song={rowData}/>}
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={newSongNavigation}>
            <Text>New Song</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Songs;
