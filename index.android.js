/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

//import {Router, Scene} from 'react-native-mobx';
import Songs from './components/Songs';

const songs = [
  {
    id: 1,
    name: 'Concerto',
    author: 'Vivaldi',
    genre: 'Classical',
  },
  {
    id: 2,
    name: 'Mi Favorita',
    author: 'Anonimo',
    genre: 'Mazurka',
  },
  {
    id: 3,
    name: 'Tema de Ibanez I',
    author: 'Ibanez',
    genre: 'Flamenco',
  },
  {
    id: 4,
    name: 'Tema de Ibanez II',
    author: 'Ibanez',
    genre: 'Flamenco',
  },
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Songs songs={songs}/>
      </View>
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

AppRegistry.registerComponent('JamOn', () => App);
