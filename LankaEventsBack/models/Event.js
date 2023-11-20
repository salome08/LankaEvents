const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  summary: { type: String, default: "" },
  description: { type: String, default: "" },
  location: {
    venueName: { type: String }, // The town/city where the event occurs
    address1: { type: String }, // The town/city where the event occurs
    address2: { type: String }, // The town/city where the event occurs
    city: { type: String }, // The town/city where the event occurs
    state: { type: String }, // The town/city where the event occurs
    postalCode: { type: String }, // The town/city where the event occurs
    country: { type: String }, // The country where the event occurs
  },
  online: { type: Boolean, default: false },
  categories: { type: Array, default: [] },
  types: { type: Array, default: [] },
  startDate: { type: Date },
  dateEnd: { type: Date, default: "" },
  timeStart: { type: Date },
  timeEnd: { type: Date, default: "" },
  pictures: [{ type: String, default: "" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  price: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
  status: { type: String, default: "draft" },
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
