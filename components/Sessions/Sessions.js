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

import SessionItem from './SessionItem';
import FlexiIcon from '../FlexiIcon';

@inject('sessions_store')
@observer
class Sessions extends Component {
  constructor(props) {
    super(props);

    this.datasource = this.setupDataSource();
    this.updateDataSource();
  }

  setupDataSource() {
    return new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  updateDataSource() {
    console.log('[Sessions] sessions_store: ', this.props.sessions_store);
    const sessions = this.props.sessions_store.getBySong(this.props.song);
    this.dataSource = this.datasource.cloneWithRows(sessions);
  }

  render() {
    console.log('[Sessions] song: ', this.props.song);
    const goToNewSession = () => Actions.session_form({song: this.props.song}); 
    this.updateDataSource();

    return (
      <View style={{flex: 1, paddingTop: 22, justifyContent: 'space-between'}}>
        <ListView
          dataSource={this.dataSource}
          renderRow={(rowData) => <SessionItem session={rowData}/>}
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={goToNewSession}>
            <FlexiIcon name='add-circle' size={50} style={{color:'#3c80f6'}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Sessions;
