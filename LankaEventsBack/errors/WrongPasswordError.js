class WrongPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "WrongPasswordError";
  }
}

module.exports = WrongPasswordError;
