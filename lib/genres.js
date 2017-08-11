const genres = require('./genres.json');

class Genres {
  static raw() {
    return genres;
  }

  static mapToOptions() {
    return Genres.raw().reduce((presenter, genre) => {
      presenter[genre] = genre.toUpperCase();
      return presenter;
    }, {});
  }

  static asOptions() {
    return typeof this._options !== 'undefined' ?
      this._options :
      this._options = Genres.mapToOptions();
  }

  asOptions() {
    return Genres.asOptions();
  }
}

export default Genres;
