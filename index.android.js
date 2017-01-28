/**
 * JamOn
 * https://github.com/saimonmoore/JamOn
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import {Provider} from 'mobx-react/native';
import {Router, Scene} from 'react-native-mobx';
import {observer} from "mobx-react/native"

import App from './components/App';
import Song from './components/Song';
import SongForm from './components/SongForm';
import * as stores from './stores';

const OSongForm = observer(SongForm);

export default class JamOn extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Scene key="root">
            <Scene key="songs" component={App} title='JamOn' initial={true} hideNavBar />
            <Scene key="song" component={Song} title='Song' hideNavBar />
            <Scene key="song_form" component={OSongForm} hideNavBar />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('JamOn', () => JamOn);
