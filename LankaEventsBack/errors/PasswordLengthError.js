class PasswordLengthError extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordLengthError";
  }
}

module.exports = PasswordLengthError;
