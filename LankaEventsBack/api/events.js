const express = require("express");
const route = express.Router();

// router.get("/", (req, res, next) => {
//   return res.send({ d: "Working User API" });
// });

const asyncHandler = require("express-async-handler");
const EventsService = require("../services/eventsService");

// API to view user detail, required auth in headers  (check auth middleware)
route.post(
  "/",
  asyncHandler(async (req, res, next) => {
    // const event = req.body;
    const event = {
      title: "Free Career Empowerment & Meditation Class - Colombo",
      description: "My third event",
      date: new Date("2022-07-26"),
      location: "Online via zoom",
    };
    try {
      const createEvent = await EventsService.create(event);
      res.status(200).json(createEvent);
    } catch (error) {
      const { name, code, errmsg, message } = error;
      res.status(400).json({
        name,
        code,
        message: errmsg || message,
        // message: getMongoError(code, "Event", errmsg || message),
      });
    }
  })
);

route.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const events = await EventsService.find();
      res.status(200).json(events);
    } catch (error) {
      const { name, code, errmsg, message } = error;
      res.status(400).json({
        name,
        code,
        message: errmsg || message,
        // message: getMongoError(code, "Event", errmsg || message),
      });
    }
  })
);

route.get("/:id", async (req, res) => {
  try {
    console.log("here");
    console.log("here", req.params.id);
    const event = await EventsService.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur while fetching event", error });
  }
});

module.exports = { path: "/events", route };
