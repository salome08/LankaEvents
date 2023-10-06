const express = require("express");
var passport = require("passport");
const router = express.Router();
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

      res
        .status(200)
        .json({ message: "Profile picture updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { path: "/user", router };
