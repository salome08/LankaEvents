const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  email: { type: String, default: "" },
  id: { type: String, default: "" },
  profilePictureUrl: { type: String, default: "" },
  googleId: { type: String, unique: true },
  password: { type: String, default: null },
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
