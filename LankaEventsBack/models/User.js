const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  emailId: { type: String, default: "" },
  password: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.pre(/^update/, function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("User", userSchema);
