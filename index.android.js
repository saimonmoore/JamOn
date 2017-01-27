/**
 * JamOn
 * https://github.com/saimonmoore/JamOn
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import {Router, Scene} from 'react-native-mobx';

import SongsStore from './stores/songs-store';
import App from './components/App';
import Song from './components/Song';

export default class JamOn extends Component {
  render() {
    return (
      <Router store={SongsStore}>
        <Scene key="root">
          <Scene key="songs" component={App} title='JamOn' initial={true} hideNavBar />
          <Scene key="song" component={Song} title='Song' hideNavBar />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('JamOn', () => JamOn);
