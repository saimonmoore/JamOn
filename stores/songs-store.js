import {reaction, observable, observe, computed, autorun} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class SongsStore {
  @observable songs = {};

  add(song) {
    this.songs[song.id] = song;
  }
}

export default new SongsStore();
