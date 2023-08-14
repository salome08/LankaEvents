const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  dateEnd: { type: Date, default: "" },
  location: {
    town: { type: String, required: true }, // The town/city where the event occurs
    country: { type: String }, // The country where the event occurs
    coordinates: {
      // Optional: Latitude and Longitude coordinates of the event location
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  online: { type: Boolean, default: false },
  address: { type: String, default: "" },
  pictures: [{ type: String, default: "" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  price: { type: mongoose.Schema.Types.Decimal128, default: 0 },
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
