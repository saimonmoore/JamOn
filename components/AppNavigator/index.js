/**
 * Defines the navigation screens for the app
 * @flow
 */
import { StackNavigator } from 'react-navigation';

import SongsScreen from '../../screens/SongsScreen';
import SongScreen from '../../screens/SongScreen';
import SongFormScreen from '../../screens/SongFormScreen';
import SessionFormScreen from '../../screens/SessionFormScreen';
import SessionScreen from '../../screens/SessionScreen';

const AppNavigator = StackNavigator({
  Songs: { screen: SongsScreen },
  Song: { screen: SongScreen },
  SessionForm: { screen: SessionFormScreen },
  SongForm: { screen: SongFormScreen },
  Session: { screen: SessionScreen },
}, {
  initialRouteName: 'Songs',
});

export default AppNavigator;
