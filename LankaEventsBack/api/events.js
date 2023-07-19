const express = require("express");
const route = express.Router();

// router.get("/", (req, res, next) => {
//   return res.send({ d: "Working User API" });
// });

route.get("/", function (req, res, next) {
  return res.json({ d: "Working Events API" });
});

const asyncHandler = require("express-async-handler");
const EventsService = require("../services/userService");

// API to view user detail, required auth in headers  (check auth middleware)
route.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const event = req.body;
    try {
      const createEvent = await EventsService.create(event);
      res.status(200).json(createEvent);
    } catch (error) {
      const { name, code, errmsg, message } = error;
      res.status(400).json({
        name,
        code,
        message: getMongoError(code, "Event", errmsg || message),
      });
    }
  })
);

route.get(
  "/test",
  asyncHandler((req, res, next) => {
    return getAll(req, res);
  })
);

module.exports = { path: "/events", route };
