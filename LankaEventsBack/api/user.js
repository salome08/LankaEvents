const express = require("express");
const route = express.Router();

// router.get("/", (req, res, next) => {
//   return res.send({ d: "Working User API" });
// });

route.get("/", function (req, res, next) {
  return res.json({ d: "Working User API" });
});

const asyncHandler = require("express-async-handler");
const UserService = require("../services/userService");

// API to login and register new user, dont required any auth in headers (check auth middleware)
route.post(
  "/login",
  asyncHandler((req, res, next) => {
    return loginUser(req, res);
  })
);
route.post(
  "/register",
  asyncHandler((req, res, next) => {
    return registerUser(req, res);
  })
);

// API to view user detail, required auth in headers  (check auth middleware)
route.get(
  "/profile",
  asyncHandler((req, res, next) => {
    return profile(req, res);
  })
);

module.exports = { path: "/user", route };
