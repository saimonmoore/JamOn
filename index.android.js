/**
 * JamOn
 * https://github.com/saimonmoore/JamOn
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
  addNavigationHelpers,
} from 'react-navigation';

import { observer } from 'mobx-react/native';

import AppNavigator from './components/AppNavigator';
import NavigationStore from './stores/navigation-store';

@observer
export default class JamOn extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = new NavigationStore();
  }

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.store.dispatch,
        state: this.store.navigationState,
      })}
      />
    );
  }
}

AppRegistry.registerComponent('JamOn', () => JamOn);
