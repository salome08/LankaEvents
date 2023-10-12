const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  profile: async (req, res) => {
    let u = await User.findOne({ _id: req.user.userId });
    res.apiSuccess(u);
  },
  findById: async (id) => {
    const user = await User.findById(id);
    return user;
  },
  findOne: (id) => {
    const user = User.findOne({ id });
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

    // Save the updated user
    await user.save();
  },
  registerUser: async (req, res) => {
    let { emailId, password, name } = req.body;
    if (!emailId) return res.apiError("Email Id is required");
    if (!name) return res.apiError("Name is required");
    if (!password || password.trim().length == 0)
      return res.apiError("Password is required");
    let u = await await User.findOne({ emailId: emailId });
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
