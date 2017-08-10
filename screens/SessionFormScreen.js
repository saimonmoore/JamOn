import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react/native';
import {
  StyleSheet,
  View,
} from 'react-native';

import SessionForm from '../components/SessionForm';
import * as stores from '../stores';

const SessionFormObserver = observer(SessionForm);

class SessionFormScreen extends Component {
  static navigationOptions = {
    title: 'New Session',
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;

    return (
      <Provider {...stores}>
        <View style={styles.container}>
          <SessionFormObserver song={params.song} navigation={navigation} />
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


export default SessionFormScreen;
