const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  organizer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organizer" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

eventSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

eventSchema.pre(/^update/, function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("Event", eventSchema);
