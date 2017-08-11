import {action, observable} from 'mobx';
import autobind from 'autobind-decorator'
import LocalStorage from '../services/LocalStorage';

@autobind
class SongsStore {

  songs = observable.map({});

  constructor() {
    console.log('[SongsStore] songs', this.songs);
    LocalStorage.loadStore('songs').then((persistedSongs) => {
      console.log('[SongsStore] persistedSongs', persistedSongs);
      this.songs.replace(persistedSongs);
    });
  }

  @action('SongsStore#add') add(song) {
    if (!song) return;
    this.songs.set(song.id, song);

    LocalStorage.persistStore('songs', this.songs);
  }

  @action('SongsStore#update') update(song, attributes) {
    if (!song) return;
    const currentSong = this.songs.get(song.id);
    this.songs.set(song.id, Object.assign(currentSong, attributes));
    LocalStorage.persistStore('songs', this.songs);
  }
}

export default SongsStore;
