const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

organizerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

organizerSchema.pre(/^update/, function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("Organizer", organizerSchema);
