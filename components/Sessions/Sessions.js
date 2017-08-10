import React, { Component } from 'react';
import {
  ListView,
  View,
  TouchableOpacity,
} from 'react-native';

import { inject, observer } from 'mobx-react/native';

import SessionItem from './SessionItem';
import FlexiIcon from '../FlexiIcon';

@observer
@inject('sessions_store')
class Sessions extends Component {
  constructor(props) {
    super(props);

    this.datasource = this.setupDataSource();
    this.updateDataSource();
  }

  setupDataSource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  updateDataSource() {
    console.log('[Sessions] sessions_store: ', this.props.sessions_store);
    const sessions = this.props.sessions_store.getBySong(this.props.song);
    this.dataSource = this.datasource.cloneWithRows(sessions);
  }

  render() {
    console.log('[Sessions] song: ', this.props.song);
    const song = this.props.song;
    const { navigation } = this.props;
    const { navigate } = navigation;
    const goToNewSession = () => navigate('SessionForm', { song, title: 'New Session' });

    this.updateDataSource();

    return (
      <View style={{ flex: 1, paddingTop: 22, justifyContent: 'space-between' }}>
        <ListView
          dataSource={this.dataSource}
          renderRow={rowData => <SessionItem session={rowData} navigation={navigation} />}
          enableEmptySections={true}
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={goToNewSession}>
            <FlexiIcon name="add-circle" size={50} style={{ color: '#3c80f6' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Sessions;
