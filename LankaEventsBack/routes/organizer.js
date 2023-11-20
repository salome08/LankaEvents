const express = require("express");
var passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const EventsService = require("../services/eventsService");
const bcrypt = require("bcrypt");
const PasswordLengthError = require("../errors/PasswordLengthError");
const OTPexpiredError = require("../errors/OTPexpiredError");
const WrongPasswordError = require("../errors/WrongPasswordError");
const axios = require("axios");
const Organizer = require("../models/Organizer");

router.get(
  "/test-jwt",
  passport.authenticate("jwt-organizer", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in test-jwt");
      const { user: organizer } = req;
      // const { organizer } = req;

      // console.log("Test User: ", organizer);
      console.log("Test Organizer: ", organizer);

      res.status(200).json("OK");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get(
  "/events",
  passport.authenticate("jwt-organizer", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in organizer/events");
      const { user: organizer } = req;

      // const { user } = req.body;

      console.log("get Events user: ", organizer);
      // console.log("get Events organizer: ", organizer);

      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }

      // // Decode the existing token
      // const JWT_SECRET = "YOUR_JWT_SECRET";
      // const existingToken = req.headers.authorization.split(" ")[1];
      // const decodedToken = jwt.verify(existingToken, JWT_SECRET);

      // // Update the necessary claims (in this case, 'name')
      // // const { organizerId } = decodedToken;
      // console.log(organizerId);

      const events = await EventsService.findOrganizer(organizer._id);
      console.log(events);

      res.status(200).json(events);
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

router.post(
  "/create-event",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("In create-event");
      const { user } = req;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error adding like:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get(
  "/test-jwt",
  passport.authenticate("jwt-organizer", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in test-jwt");
      const { user: organizer } = req;
      // const { organizer } = req;

      // console.log("Test User: ", organizer);
      console.log("Test Organizer: ", organizer);

      res.status(200).json("OK");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt-organizer", { session: false }),
  async (req, res) => {
    try {
      console.log("in get Organizer Profile");
      const { user: organizer } = req;

      // Find the user by ID
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }

      res.status(200).json(organizer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { path: "/organizer", router };
