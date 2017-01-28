import {reaction, observable, observe, computed, autorun} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class SongsStore {
  @observable songs = {};

  add(song) {
    if (!song) return;

    song.id = this.nextId();
    this.songs[song.id] = song;
  }

  nextId() {
    return Object.keys(this.songs).length + 1;
  }
}

export default SongsStore;
