const express = require("express");
var passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
// const User = require("../"); // Assuming your model is in a separate file

// API to login and register new user, dont required any auth in headers (check auth middleware)
// Route to update the profilePictureUrl
router.post(
  "/profile-picture",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in profile-picture");
      const { user } = req;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newProfilePictureUrl = req.body.profilePictureUrl;
      await UserService.updateProfilePicture(user._id, newProfilePictureUrl);

      // Decode the existing token
      const JWT_SECRET = "YOUR_JWT_SECRET";
      const existingToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(existingToken, JWT_SECRET);

      // Update the necessary claims (in this case, 'name')
      decodedToken.pictureUrl = newProfilePictureUrl;

      // Create a new token with the updated and existing claims
      const newToken = jwt.sign(decodedToken, JWT_SECRET);

      res.status(200).json({
        message: "Profile picture updated successfully",
        token: newToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/update-name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in update-name");
      const { user } = req;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { firstname, lastname } = req.body;
      await UserService.updateUserName(user._id, firstname, lastname);

      // Decode the existing token
      const JWT_SECRET = "YOUR_JWT_SECRET";
      const existingToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(existingToken, JWT_SECRET);

      // Update the necessary claims (in this case, 'name')
      decodedToken.name = `${firstname} ${lastname}`;
      decodedToken.firstname = firstname;
      decodedToken.lastname = lastname;

      // Create a new token with the updated and existing claims
      const newToken = jwt.sign(decodedToken, JWT_SECRET);

      res
        .status(200)
        .json({ message: "Name updated successfully", token: newToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get(
  "/verification-code",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in update-password");
      // const { user } = req;

      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }

      await UserService.getVerificationCode();
      // await UserService.getVerificationCode(user._id);

      res.status(200).json({ message: "Password created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { path: "/user", router };
