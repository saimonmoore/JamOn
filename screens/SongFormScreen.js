import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react/native';
import {
  StyleSheet,
  View,
} from 'react-native';

import SongForm from '../components/SongForm';
import * as stores from '../stores';

const SongFormObserver = observer(SongForm);

class SongFormScreen extends Component {
  static navigationOptions = {
    title: 'New Song',
  }

  render() {
    const { navigation } = this.props;

    return (
      <Provider {...stores}>
        <View style={styles.container}>
          <SongFormObserver navigation={navigation} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});


export default SongFormScreen;
