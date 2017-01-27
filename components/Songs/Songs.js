import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';

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
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <SongItem song={rowData}/>}
        />
      </View>
    );
  }
}

export default Songs;
