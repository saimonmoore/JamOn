import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import {
  StyleSheet,
  View,
} from 'react-native';

import Session from '../components/Session';
import * as stores from '../stores';

class SessionScreen extends Component {
  static navigationOptions = {
    title: 'New Session',
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;

    return (
      <Provider {...stores}>
        <View style={styles.container}>
          <Session song={params.song} navigation={navigation} />
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


export default SessionScreen;
