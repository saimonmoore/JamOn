import { useStrict } from 'mobx';

import SongsStore from './songs-store';
import SessionsStore from './sessions-store';

// Force strict mode so mutations are only allowed within actions.
useStrict(true);

export const songs_store = new SongsStore();
export const sessions_store = new SessionsStore();
