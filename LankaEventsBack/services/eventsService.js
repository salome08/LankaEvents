const mongoose = require("mongoose");
const Event = require("../models/Event");
const moment = require("moment");

module.exports = {
  profile: async (req, res) => {
    let u = await User.findOne({ _id: req.user.userId });
    res.apiSuccess(u);
  },
  signIn: async () => {},
  create: (eventInfos) => {
    console.log(eventInfos);
    const event = new Event({
      _id: new mongoose.Types.ObjectId(),
      ...eventInfos,
    });
    return event.save();
  },
  findById: (id) => {
    const event = Event.findById(id);
    return event;
  },
  find: (filter) => {
    const events = Event.find(filter);
    return events;
  },
  findLiked: async (userId) => {
    try {
      const events = await Event.find({
        likes: { $in: [userId] },
      });
      // const eventsIds = events.map((el) => el._id);
      return events;
    } catch (error) {
      console.error(error);
    }
  },
  findFiltered: async (filters) => {
    try {
      console.log("filters", filters);
      const pipeline = getFilterPipepline(filters);
      const events = await Event.aggregate(pipeline);

      return events;
    } catch (error) {
      console.error(error);
    }
  },
  findOne: (filter) => {
    const content = Contents.findOne(filter);
    return content;
  },

  updateMany: (filter, update, options = {}) => {
    const updatedContents = Contents.updateMany(filter, update, options);
    return updatedContents;
  },
  update: (id, contentInfos) => {
    const updateState = Contents.findByIdAndUpdate(id, contentInfos, {
      runValidators: true,
      new: true,
    });
    return updateState;
  },
  delete: (_id) => {
    const deleteState = Contents.deleteOne({
      _id,
    });
    return deleteState;
  },
};

const getFilterPipepline = (filters) => {
  const { town, date } = filters;

  const pipeline = [];
  if (town && town !== "Sri Lanka") {
    pipeline.push({
      $match: {
        "location.town": town, // Filter events by town
      },
    });
  }

  if (date) {
    // Get the start and end of the current week
    switch (date) {
      case "anytime":
        break;
      case "today":
        {
          const today = moment().startOf("day");
          const endOfToday = moment(today).endOf("day");

          pipeline.push({
            $match: {
              date: {
                $gte: today.toDate(), // Events with dates greater than or equal to the beginning of today
                $lte: endOfToday.toDate(), // Events with dates less than or equal to the end of today
              },
            },
          });
        }
        break;
      case "tomorrow":
        {
          const tomorrow = moment().add(1, "day").startOf("day");
          const endOfTomorrow = moment(tomorrow).endOf("day");

          pipeline.push({
            $match: {
              date: {
                $gte: tomorrow.toDate(), // Events with dates greater than or equal to the beginning of tomorrow
                $lte: endOfTomorrow.toDate(), // Events with dates less than or equal to the end of tomorrow
              },
            },
          });
        }
        break;
      case "this_week":
        {
          const today = moment();
          const startOfWeek = moment(today).startOf("isoWeek");
          const endOfWeek = moment(startOfWeek).endOf("isoWeek");
          pipeline.push({
            $match: {
              date: {
                $gte: startOfWeek.toDate(), // Events with dates greater than or equal to the start of the week
                $lte: endOfWeek.toDate(), // Events with dates less than or equal to the end of the week
              },
            },
          });
        }
        break;
      case "this_weekend":
        {
          const today = moment();
          const startOfWeekend = moment(today)
            .startOf("isoWeek")
            .add(4, "days"); // Set to Friday of this weekend
          const endOfWeekend = moment(startOfWeekend).add(3, "day"); // Set to Sunday of this weekend

          console.log({ startOfWeekend });
          console.log({ endOfWeekend });
          pipeline.push({
            $match: {
              date: {
                $gte: startOfWeekend.toDate(), // Events with dates greater than or equal to the start of this weekend (Saturday)
                $lt: endOfWeekend.toDate(), // Events with dates less than or equal to the end of this weekend (Sunday)
              },
            },
          });
        }
        break;
      default:
        {
          const dateToMatch = moment(date).startOf("day");
          const endOfDay = moment(dateToMatch).endOf("day");
          pipeline.push({
            $match: {
              date: {
                $gte: dateToMatch.toDate(), // Events with dates greater than or equal to the beginning of today
                $lte: endOfDay.toDate(), // Events with dates less than or equal to the end of today
              },
            },
          });
        }
        break;
    }
  }

  return pipeline;
};
