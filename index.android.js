/**
 * JamOn
 * https://github.com/saimonmoore/JamOn
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Provider } from 'mobx-react/native';
import {
  addNavigationHelpers,
} from 'react-navigation';

import AppNavigator from './components/AppNavigator';
import NavigationStore from './stores/navigation-store';
import * as stores from './stores';

export default class JamOn extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = new NavigationStore();
  }

  render() {
    return (
      <Provider {...stores}>
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.store.dispatch,
          state: this.store.navigationState,
        })}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('JamOn', () => JamOn);
