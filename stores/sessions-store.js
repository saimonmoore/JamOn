import {action, observable} from 'mobx';
import autobind from 'autobind-decorator'
import LocalStorage from '../services/LocalStorage';

@autobind
class SessionsStore {

  sessions = observable.map({});

  constructor() {
    console.log('[SessionsStore] sessions', this.sessions);
    LocalStorage.loadStore('sessions').then((persistedSessions) => {
      console.log('[SessionsStore] persistedSessions', persistedSessions);
      this.sessions.replace(persistedSessions);
    });
  }

  @action('SessionsStore#add') add(session) {
    if (!session) return;
    this.sessions.set(session.id, session);

    LocalStorage.persistStore('sessions', this.sessions);
  }

  @action('SessionsStore#update') update(session, attributes) {
    if (!session) return;
    const currentSession = this.sessions.get(session.id);
    this.sessions.set(session.id, Object.assign(currentSession, attributes));
    LocalStorage.persistStore('sessions', this.sessions);
  }

  @action('SessionsStore#delete') delete(session) {
    if (!session) return;
    const currentSession = this.sessions.get(session.id);
    this.sessions.delete(session.id);
    LocalStorage.persistStore('sessions', this.sessions);
  }

  getAsList() {
    return this.sessions.values();
  }

  getBySong(song) {
    return this.getAsList().filter((session) => song.id === session.song_id);
  }
}

export default SessionsStore;
