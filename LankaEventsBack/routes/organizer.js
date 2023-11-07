const express = require("express");
var passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const bcrypt = require("bcrypt");
const PasswordLengthError = require("../errors/PasswordLengthError");
const OTPexpiredError = require("../errors/OTPexpiredError");
const WrongPasswordError = require("../errors/WrongPasswordError");
const axios = require("axios");

router.get(
  "/events",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in organizer/events");
      const { user } = req;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Decode the existing token
      const JWT_SECRET = "YOUR_JWT_SECRET";
      const existingToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(existingToken, JWT_SECRET);

      // Update the necessary claims (in this case, 'name')
      const { organizerId } = decodedToken;
      console.log(organizerId);

      res.status(200).json({
        message: "Organizer's events",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get(
  "/send-otp-sms",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { data } = await axios.post(
        "https://api.octopush.com/v1/public/sms-campaign/send",
        {
          text: "Your code is 12498",
          recipients: [
            {
              phone_number: "+33659213813",
              first_name: "Salome",
              last_name: "Hazan",
              param3: "M",
            },
          ],
          type: "sms_low_cost",
          sender: "LankaEvents",
          purpose: "alert",
          with_replies: false,
          simulation_mode: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": "Qt26kyoJ78AOWXEqz0fmnTYHNKLdabGu",
            "api-login": "salome.hazan@yahoo.fr",
            "cache-control": "no-cache",
          },
        }
      );
      res.status(200).json({
        message: "Sms sent",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { path: "/organizer", router };
