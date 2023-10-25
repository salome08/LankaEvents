class OTPexpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = "OTPexpiredError";
  }
}

module.exports = OTPexpiredError;
