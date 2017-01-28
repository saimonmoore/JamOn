import { useStrict } from 'mobx';

import SongsStore from './songs-store';

// Force strict mode so mutations are only allowed within actions.
useStrict(true);

export const songs_store = new SongsStore();
