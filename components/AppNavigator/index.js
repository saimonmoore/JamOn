/**
 * Defines the navigation screens for the app
 * @flow
 */
import { observer } from 'mobx-react/native';
import { StackNavigator } from 'react-navigation';

import App from './components/App';
import Song from './components/Song';
import Session from './components/Session';
import SongForm from './components/SongForm';
import SessionForm from './components/SessionForm';

const SongFormObserver = observer(SongForm);
const SessionFormObserver = observer(SessionForm);

const AppNavigator = StackNavigator({
  Songs: { screen: App },
  Song: { screen: Song },
  SongForm: { screen: SongFormObserver },
  SessionForm: { screen: SessionFormObserver },
  Session: { screen: Session },
}, {
  initialRouteName: 'Songs',
  navigationOptions: {
    header: ({ state }) => (
      { title: state.params && state.params.title }
    ),
  },
});

export default AppNavigator;
