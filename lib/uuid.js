class Uuid {
  /**
   *  RFC4122 version 4 compliant uuid generator
   *  using ES6 crypto API
   *
   *  @return {String} e.g. 156e6f54-ee8d-470c-84c4-88432513bb62
   */
  generateV4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}

export default Uuid;
