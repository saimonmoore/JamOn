const minTempo = 40;
const maxTempo = 208;

class Tempo {
  static acceptedTempos() {
    const range = (start, end) => (
      Array.from({ length: (end - start) }, (v, k) => k + start)
    );

    const suggestion = 'Select a tempo';
    const opts = {};
    opts.unselected = suggestion;
    return range(minTempo, maxTempo + 1).reduce((presenter, tempo) => {
      presenter[`0${tempo}`] = tempo.toString();
      return presenter;
    }, opts);
  }

  static asOptions() {
    return typeof this._options !== 'undefined' ?
      this._options :
      this._options = Tempo.acceptedTempos();
  }

  asOptions() {
    return Tempo.asOptions();
  }
}

export default Tempo;
