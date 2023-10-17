const crypto = require("crypto");

module.exports = {
  generate5digit: () => {
    // Generate a random 2-byte (16-bit) buffer
    const buffer = crypto.randomBytes(2);

    // Convert the buffer to an integer and ensure it's a positive number
    const randomValue = Math.abs(buffer.readUInt16BE(0));

    // Ensure the number is exactly 5 digits long by adding leading zeros
    const formattedNumber = String(randomValue).padStart(5, "0");

    return formattedNumber;
  },
};
