/**
 * JamOn
 * https://github.com/saimonmoore/JamOn
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider, observer } from 'mobx-react/native';
import { Reducer, Router, Scene } from 'react-native-router-flux';

import App from './components/App';
import Song from './components/Song';
import Session from './components/Session';
import SongForm from './components/SongForm';
import SessionForm from './components/SessionForm';
import * as stores from './stores';

const SongFormObserver = observer(SongForm);
const SessionFormObserver = observer(SessionForm);

const createReducer = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

export default class JamOn extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router createReducer={createReducer} >
          <Scene key="root">
            <Scene key="songs" component={App} title="JamOn" initial={true} hideNavBar={true} />
            <Scene key="song" component={Song} title="Song" hideNavBar={true} />
            <Scene key="song_form" component={SongFormObserver} hideNavBar={true} />
            <Scene key="session_form" component={SessionFormObserver} hideNavBar={true} />
            <Scene key="session" component={Session} hideNavBar={true} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('JamOn', () => JamOn);
