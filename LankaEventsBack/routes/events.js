const express = require("express");
var passport = require("passport");
const router = express.Router();
const moment = require("moment");
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
const momentDate = new moment("2023-08-18T18:00:00.000Z");
const readyToInsert = momentDate.format("YYYY-MM-DD HH:mm:ss");

router.post(
  "/create-event",
  passport.authenticate("jwt-organizer", { session: false }),
  async (req, res) => {
    try {
      console.log("in events/createEvents");
      const { user: organizer } = req;
      const { event } = req.body;

      console.log("req", req.body);

      if (!organizer) {
        return res.status(404).json({ message: "organizer not found" });
      }

      // const event = {
      //   title: "Event 09",
      //   description: "My 9th event",
      //   date: readyToInsert,
      //   location: { town: "Weligama" },
      //   online: false,
      //   categories: ["Health", "Community"],
      //   types: ["Expo"],
      //   price: 30,
      // };
      const createdEvent = await EventsService.create(organizer._id, event);
      // res.status(200).json("OK");
      res.status(200).json(createdEvent);
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
  "/update-event/:eventId",
  passport.authenticate("jwt-organizer", { session: false }),
  async (req, res) => {
    try {
      console.log("in events/update-event");
      const { user: organizer } = req;
      const { eventData } = req.body;
      const { eventId } = req.params;

      if (!organizer) {
        return res.status(404).json({ message: "organizer not found" });
      }

      console.log("eventId", eventId);
      console.log("eventData", eventData);

      const updatedEvent = await EventsService.update(eventId, eventData);
      // res.status(200).json("OK");
      res.status(200).json(updatedEvent);
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
  "/",
  asyncHandler(async (req, res, next) => {
    // const event = req.body;
    const event = {
      title: "Event 09",
      description: "My 9th event",
      date: readyToInsert,
      location: { town: "Weligama" },
      online: false,
      categories: ["Health", "Community"],
      types: ["Expo"],
      price: 30,
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

// get home events
router.get("/home", async (req, res, next) => {
  try {
    const { town } = req.query;
    const homeEvents = await EventsService.findHome(town);
    // console.log("homeEvents", homeEvents);
    res.status(200).json(homeEvents);
  } catch (error) {
    const { name, code, errmsg, message } = error;
    res.status(400).json({
      name,
      code,
      message: errmsg || message,
      // message: getMongoError(code, "Event", errmsg || message),
    });
  }
});

// get filtered events
router.get("/filter", async (req, res, next) => {
  try {
    const { filters } = req.query;
    const filteredEvents = await EventsService.findFiltered(filters);
    res.status(200).json(filteredEvents);
  } catch (error) {
    const { name, code, errmsg, message } = error;
    res.status(400).json({
      name,
      code,
      message: errmsg || message,
      // message: getMongoError(code, "Event", errmsg || message),
    });
  }
});

router.get(
  "/liked",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      console.log(req.user);
      const likedEvents = await EventsService.findLiked(user._id);
      res.status(200).json(likedEvents);
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

router.get("/query/:query", async (req, res, next) => {
  try {
    console.log("/query/:query");
    const { query } = req.params;
    const queryEvents = await EventsService.findFromQuery(query);
    res.status(200).json(queryEvents);
  } catch (error) {
    const { name, code, errmsg, message } = error;
    res.status(400).json({
      name,
      code,
      message: errmsg || message,
      // message: getMongoError(code, "Event", errmsg || message),
    });
  }
});

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

      console.log("like event user", req.user);
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
