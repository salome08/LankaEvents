const express = require("express");
var passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const bcrypt = require("bcrypt");
const PasswordLengthError = require("../errors/PasswordLengthError");
const OTPexpiredError = require("../errors/OTPexpiredError");
const WrongPasswordError = require("../errors/WrongPasswordError");

const JWT_SECRET = "YOUR_JWT_SECRET";

// const User = require("../"); // Assuming your model is in a separate file

// API to login and register new user, dont required any auth in headers (check auth middleware)
// // Route to update the profilePictureUrl
// class PasswordLengthError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "PasswordLengthError";
//   }
// }

function validatePassword(password) {
  if (password.length < 8) {
    throw new PasswordLengthError("Password needs to be at least 8 characters");
  }
  // Additional password validation logic
  // ...
}

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
  "/has-password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("laa");
      const userHasPssword = await UserService.userHasPassword(user._id);

      res.status(200).json({
        userHasPassword: userHasPssword,
      });
    } catch (error) {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
);

router.get(
  "/send-OTP-email",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in send-OTP-email");
      const { user } = req;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await UserService.sendOTPEmail(user._id);
      // await UserService.getVerificationCode(user._id);

      res.status(200).json({ message: "Password created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/verify-OTP",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in verify-OTP");
      const { user } = req;
      const { code } = req.body;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await UserService.verifyOTP(user._id, code);
      // await .getVerificationCode(user._id);

      res.status(200).json({ message: "Password created successfully" });
    } catch (error) {
      console.error(error.stack);
      if (error instanceof OTPexpiredError) {
        console.log("here");
        res.status(400).json({ message: error.message });
      } else {
        console.log("la");
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
);

router.post(
  "/create-password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in create-password");
      const { user } = req;
      const { password } = req.body;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      validatePassword(password);

      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          throw new Error("Error hashing password");
        }
        // Store hash in your password DB.
        UserService.createPassword(user._id, hash);
      });

      res
        .status(200)
        .json({ message: "Your password was successfully changed" });
    } catch (error) {
      console.error(error.stack);
      if (error instanceof PasswordLengthError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
);

router.post(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in update-password");
      const { user } = req;
      const { currentPassword, newPassword } = req.body;

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check password length or throw error
      validatePassword(newPassword);

      await UserService.updatePassword(user._id, currentPassword, newPassword);

      res
        .status(200)
        .json({ message: "Your password was successfully changed" });
    } catch (error) {
      console.error(error.stack);
      if (
        error instanceof PasswordLengthError ||
        error instanceof WrongPasswordError
      ) {
        console.log("here");
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
);

router.post("/close-account", async (req, res) => {
  try {
    // Find the user by ID
    console.log("in close-account");
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log out user
    // Check password if password same as user password
    // Delete user from db
    await UserService.closeAccount(user, password);

    res
      .status(200)
      .json({ message: "Your account has been successfully closed" });
  } catch (error) {
    console.error(error.stack);
    if (error instanceof WrongPasswordError) {
      res.status(400).json({ email: error.message });
    } else res.status(500).json({ message: "An unexpected error occurred" });
  }
});

router.get(
  "/create-organizer-account",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find the user by ID
      console.log("in create-organizer-account");
      const { user } = req;
      const { code } = req.body;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const organizer = await UserService.createOrganizer(user._id);

      const token = jwt.sign(
        {
          id: organizer.userId,
          organizerId: organizer._id,
        },
        JWT_SECRET
        // { expiresIn: "3h" }
      );

      // console.log("token", token);
      // console.log("organizer", organizer);
      // await .getVerificationCode(user._id);

      // Verify OTP
      // If good:
      // - create Organizer with userId
      // If not:
      // - Send error

      res.status(200).json({ token });
    } catch (error) {
      console.error(error.stack);
      if (error instanceof OTPexpiredError) {
        console.log("here");
        res.status(400).json({ message: error.message });
      } else {
        console.log("la");
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
);

module.exports = { path: "/user", router };
