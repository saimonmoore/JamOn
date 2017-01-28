import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-mobx';
import { inject, observer } from 'mobx-react/native';

import SongItem from './SongItem';
import FlexiIcon from '../FlexiIcon';

@inject('songs_store')
@observer
class Songs extends Component {
  constructor(props) {
    super(props);

    this.datasource = this.setupDataSource();
    this.updateDataSource();
    console.log('[Songs#constructor] done');
  }

  setupDataSource() {
    return new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  updateDataSource() {
    const songs = this.props.songs_store.songs.values();
    console.log('[Songs#updateDataSource]  ===> songs: ', songs)
    this.dataSource = this.datasource.cloneWithRows(songs);
  }

  render() {
    const newSongNavigation = () => Actions.new_song(); 
    this.updateDataSource();

    return (
      <View style={{flex: 1, paddingTop: 22, justifyContent: 'space-between'}}>
        <ListView
          dataSource={this.dataSource}
          renderRow={(rowData) => <SongItem song={rowData}/>}
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={newSongNavigation}>
            <FlexiIcon name='add-circle' size={50} style={{color:'#3c80f6'}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Songs;
