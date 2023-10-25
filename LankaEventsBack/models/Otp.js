const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

var UTC = moment.utc();
console.log(UTC.format()); // UTC time

var cLocal = UTC.local();
console.log(cLocal.format()); // Convert UTC time

var local = moment();
console.log(local); // Local time
console.log(local.format()); // Local time

// Create an OTP schema
const otpSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // You can reference the user associated with the OTP
      ref: "User", // Replace 'User' with the actual name of your user schema
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

otpSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 7200 });

module.exports = mongoose.model("OTP", otpSchema);
