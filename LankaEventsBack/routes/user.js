const express = require("express");
const router = express.Router();

// API to login and register new user, dont required any auth in headers (check auth middleware)
router.post("/login", (req, res, next) => {
  return loginUser(req, res);
});
router.post("/register", (req, res, next) => {
  return registerUser(req, res);
});

module.exports = { path: "/user", router };
