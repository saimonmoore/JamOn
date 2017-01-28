import {
  AsyncStorage,
} from 'react-native';

import autobind from 'autobind-decorator';

class LocalStorage {

  @autobind storeKey(key) {
    return `@JamOn:${key}`;
  }

  /**
   * Persists a store to local storage
   *
   * @param name {String}
   * @param store {Object}
   * @return {Boolean}
   */
  async persistStore(name, store) {
    const key = this.storeKey(name);
    const storeData = JSON.stringify(store.toJS());

    try {
      await AsyncStorage.setItem(key, storeData);
      return true;
    } catch (error) {
      console.log(`[LocalStorage#persistStore] key: ${key} store:`, store, ' set failed! Error was: ', error);
    }
  }

  /**
   * Loads a store from local storage
   *
   * @param key {String}
   * @return {Object}
   */
  async loadStore(key) {
    try {
      const storeData = await AsyncStorage.getItem(this.storeKey(key));
      if (storeData !== null){
        const store = this.restoreStore(storeData);
        return store;
      } else {
        return {};
      }
    } catch (error) {
      console.log(`[LocalStorage#loadStore] key: ${key} get failed! Error was: `, error);
    }
  }

  restoreStore(storeData) {
    try {
      return JSON.parse(storeData);
    } catch(error) {
      console.log(`[LocalStorage#restoreStore] storeData:`, store, ' JSON parsing failed! Error was: ', error);
    }
  }
}

export default new LocalStorage();
