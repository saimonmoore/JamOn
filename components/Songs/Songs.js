import React, { Component } from 'react';
import {
  ListView,
  View,
  TouchableOpacity,
} from 'react-native';

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
  }

  setupDataSource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  updateDataSource() {
    const songs = this.props.songs_store.songs.values();
    console.log('====> songs: ', this.props.songs_store.songs);
    this.dataSource = this.datasource.cloneWithRows(songs);
  }

  render() {
    const { navigate } = this.props.navigation;
    const goToNewSong = () => navigate('SongForm', { title: 'New Song' });
    this.updateDataSource();

    return (
      <View style={{ flex: 1, paddingTop: 22, justifyContent: 'space-between' }}>
        <ListView
          dataSource={this.dataSource}
          renderRow={rowData => <SongItem song={rowData} />}
          enableEmptySections={true}
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={goToNewSong}>
            <FlexiIcon name="add-circle" size={50} style={{ color: '#3c80f6' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Songs;
