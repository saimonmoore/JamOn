import {action, observable} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class SongsStore {
  songs = observable.map({});

  @action add(song) {
    if (!song) return;
    this.songs.set(song.name, song);
  }

  nextId() {
    return Object.keys(this.songs).length + 1;
  }
}

export default SongsStore;
