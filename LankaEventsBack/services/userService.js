const mongoose = require("mongoose");
const User = require("../models/User");
const Organizer = require("../models/Organizer");
const OTP = require("../models/Otp");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");
const verificationCode = require("../utils/functions/verificationCode");
const email = require("../utils/functions/email");
const OTPexpiredError = require("../errors/OTPexpiredError");
const WrongPasswordError = require("../errors/WrongPasswordError");
const bcrypt = require("bcrypt");

module.exports = {
  profile: async (req, res) => {
    let u = await User.findOne({ _id: req.user.userId });
    res.apiSuccess(u);
  },
  findById: async (id) => {
    const user = await User.findById(id);
    return user;
  },
  findOne: async (filter) => {
    const user = await User.findOne(filter);
    return user;
  },
  findByEmail: async (email) => {
    const user = await User.findOne({ email: email });
    return user;
  },
  create: (userInfos) => {
    const user = new User({
      ...userInfos,
    });
    return user.save();
  },
  updateProfilePicture: async (userId, newProfilePictureUrl) => {
    const user = await User.findById(userId);
    // Update the profilePictureUrl field
    user.profilePictureUrl = newProfilePictureUrl;

    // Save the updated user
    await user.save();
  },
  updateUserName: async (userId, firstname, lastname) => {
    const user = await User.findById(userId);
    // Update the profilePictureUrl field
    user.firstname = firstname;
    user.lastname = lastname;
    user.name = `${firstname} ${lastname}`;

    // Save the updated user
    await user.save();
  },
  sendOTPEmail: async (userId) => {
    // const user = await User.findById(userId);
    // Update the profilePictureUrl field
    // user.firstname = firstname;
    const code = verificationCode.generate5digit();
    // console.log("user email", user.email);
    let otp = await OTP.findOne({ user: userId });

    if (!otp) {
      otp = new OTP({
        user: userId,
        code: code,
      });
    } else {
      otp.code = code;
    }
    console.log(otp);
    await otp.save();
    email.sendVerificationCode("salome.hazan@yahoo.fr", code);
    // Save the updated user
  },
  verifyOTP: async (userId, code) => {
    // const user = await User.findById(userId);
    const otp = await OTP.findOne({ user: userId });
    console.log("otp code", otp.code);

    if (!otp || otp.code !== code) {
      console.log("otp db", otp.code);
      console.log("otp received", code);

      throw new OTPexpiredError("Code is wrong or expired");
    }
  },
  createPassword: async (userId, hash) => {
    const user = await User.findById(userId);
    console.log("password", hash);

    user.password = hash;
    await user.save();
  },
  updatePassword: async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);

    const match = await bcrypt.compare(currentPassword, user.password);

    if (match) {
      const hash = await bcrypt.hash(newPassword, 10);
      user.password = hash;
      await user.save();
    } else {
      throw new WrongPasswordError("We don't recognize this password");
    }

    // console.log("password", hash);
  },
  userHasPassword: async (userId) => {
    const user = await User.findById(userId);
    return !!user.password;
  },
  closeAccount: async (user, password) => {
    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("match");
      // Delete user from db
      await User.deleteOne({ _id: user._id });
    } else {
      console.log("not match");
      throw new WrongPasswordError(user.email);
    }
  },
  createOrganizer: (userId) => {
    const organizer = new Organizer({
      userId: userId,
    });
    return organizer.save();
  },
  getOrganizer: async (userId) => {
    const organizer = await Organizer.findOne({ userId });
    return organizer;
  },
  registerUser: async (req, res) => {
    let { emailId, password, name } = req.body;
    if (!emailId) return res.apiError("Email Id is required");
    if (!name) return res.apiError("Name is required");
    if (!password || password.trim().length == 0)
      return res.apiError("Password is required");
    let u = await User.findOne({ emailId: emailId });
    if (u) {
      return res.apiError("This Email Id is already registered!");
    } else {
      password = sha256(password);
      u = await User.create({ emailId, password, name });
      let data = {
        name: u.name,
        token: jwt.encode(
          { userId: u.id.toString(), time: new Date().getTime() },
          secret
        ),
      };
      return res.apiSuccess(data);
    }
  },
  loginUser: async (req, res) => {
    let { emailId, password } = req.body;
    let u = await User.findOne({ emailId: emailId });
    if (u) {
      password = sha256(password);
      if (u.password == password) {
        let data = {
          name: u.name,
          token: jwt.encode(
            { userId: u.id.toString(), time: new Date().getTime() },
            secret
          ),
        };
        req.app.get("eventEmitter").emit("login", "Test event emitter");
        return res.apiSuccess(data);
      }
      return res.apiError("Invalid Password");
    }
    return res.apiError("Invalid Email Id");
  },
};
