const express = require("express");
var passport = require("passport");
const router = express.Router();

// router.get("/", (req, res, next) => {
//   return res.send({ d: "Working User API" });
// });

const asyncHandler = require("express-async-handler");
const EventsService = require("../services/eventsService");

router.get(
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

// API to view user detail, required auth in headers  (check auth middleware)
router.post(
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

router.get(
  "/liked",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      console.log(req.user);
      const likedEvents = await EventsService.findLiked(user._id);
      res.status(200).json(likedEvents);
      res.status(200);
    } catch (error) {
      const { name, code, errmsg, message } = error;
      res.status(400).json({
        name,
        code,
        message: errmsg || message,
        // message: getMongoError(code, "Event", errmsg || message),
      });
    }
  }
);

router.post(
  "/:eventId/like",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("In like protected route");
      const { eventId } = req.params;

      const event = await EventsService.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Check if the user has already liked the event
      const userId = req.user._id; // Assuming you have the authenticated user's ID in the request object
      const userLikedIndex = event.likes.indexOf(userId);

      if (userLikedIndex === -1) {
        // User has not liked the event, add the like
        event.likes.push(userId);
        await event.save();
        return res.json({ message: "Event liked successfully" });
      } else {
        // User has already liked the event, remove the like
        event.likes.splice(userLikedIndex, 1);
        await event.save();
        return res.json({ message: "Event unliked successfully" });
      }
    } catch (error) {
      console.error("Error adding like:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// router.post(
//   "/like",
//   // passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     try {
//       console.log("In like protected route");
//       console.log(req);
//       // const { eventId } = req.params;

//       // const event = await EventsService.findById(eventId);
//       // if (!event) {
//       //   return res.status(404).json({ message: "Event not found" });
//       // }

//       // // Check if the user has already liked the event
//       // const userId = req.user._id; // Assuming you have the authenticated user's ID in the request object
//       // const userLikedIndex = event.likes.indexOf(userId);

//       // if (userLikedIndex === -1) {
//       //   // User has not liked the event, add the like
//       //   event.likes.push(userId);
//       //   await event.save();
//       //   return res.json({ message: "Event liked successfully" });
//       // } else {
//       //   // User has already liked the event, remove the like
//       //   event.likes.splice(userLikedIndex, 1);
//       //   await event.save();
//       //   return res.json({ message: "Event unliked successfully" });
//       // }
//     } catch (error) {
//       console.error("Error adding like:", error);
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   }
// );

router.get("/:id", async (req, res) => {
  try {
    const event = await EventsService.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur while fetching event", error });
  }
});

module.exports = { path: "/events", router };
