import {action, observable} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class SongsStore {
  songs = observable.map({});

  @action('SongsStore#add') add(song) {
    if (!song) return;
    this.songs.set(song.name, song);
  }

  @action('SongsStore#update') update(song, attributes) {
    if (!song) return;
    const currentSong = this.songs.get(song.name);
    this.songs.set(song.name, Object.assign(currentSong, attributes));
  }
}

export default SongsStore;
