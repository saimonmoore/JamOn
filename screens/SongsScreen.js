import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import {
  StyleSheet,
  View,
} from 'react-native';

import Songs from '../components/Songs';
import * as stores from '../stores';

class SongsScreen extends Component {
  static navigationOptions = {
    title: 'Songs',
  }

  render() {
    const { navigation } = this.props;

    return (
      <Provider {...stores}>
        <View style={styles.container}>
          <Songs navigation={navigation} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default SongsScreen;
