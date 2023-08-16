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
      }).sort({ date: 1 });
      // const eventsIds = events.map((el) => el._id);
      return events;
    } catch (error) {
      console.error(error);
    }
  },
  findFromQuery: async (query) => {
    try {
      // Create a regular expression pattern for case-insensitive matching
      const queryPattern = new RegExp(query, "i");
      const events = await Event.find({ title: queryPattern });
      // const eventsIds = events.map((el) => el._id);
      console.log(events);
      return events;
    } catch (error) {
      console.error(error);
    }
  },
  findFiltered: async (filters) => {
    try {
      console.log("filters", filters);
      const { sortBy } = filters;
      const pipeline = getFilterPipepline(filters);
      console.log("pipeline", pipeline);
      const events = pipeline.length
        ? await Event.aggregate(pipeline)
        : await Event.find();

      // console.log("not sorted Events", events);
      let sortedEvents;
      if (sortBy === "date") {
        sortedEvents = events.sort((a, b) =>
          moment(a.date).isSameOrBefore(moment(b.date)) ? -1 : 1
        );
      } else {
        events.forEach((event) => {
          event.relevanceScore = calculateRelevance(event, filters);
        });
        // Sort events by relevance score in descending order
        sortedEvents = events.sort(
          (a, b) => b.relevanceScore - a.relevanceScore
        );
      }
      // console.log("sortedEvents", sortedEvents);
      // console.sortedEventslog(sortedEvents);
      sortedEvents.forEach((e) => {
        console.log(e), console.log(e.relevanceScore);
      });
      return sortedEvents;
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

// UTILS FUNCTIONS

const calculateRelevance = (event, filters) => {
  const { town, date, categories, types, free } = filters;
  // organizer followers + (To implement in the future)
  // match with the search bar test (To implement in close future)

  let relevance = 0;
  // Number of occurence with categories searched
  if (categories) {
    const setFilters = new Set(categories);
    const matchCategories = event.categories.filter((category) =>
      setFilters.has(category)
    );
    relevance += matchCategories.length * 2;
  }
  // Number of occurence with types searched
  if (types) {
    const setTypes = new Set(types);
    const matchTypes = event.categories.filter((type) => setTypes.has(type));
    relevance += matchTypes.length * 2;
  }
  // Number of like of the event
  relevance += event.likes.length;
  return relevance;
};

const getFilterPipepline = (filters) => {
  const { town, date, categories, types, free } = filters;
  const pipeline = [];

  if (town && town !== "Sri Lanka") {
    pipeline.push({
      $match: {
        "location.town": town, // Filter events by town
      },
    });
  }

  if (free === "true") {
    pipeline.push({
      $match: {
        price: 0, // Filter events by town
      },
    });
  }

  if (categories?.length) {
    pipeline.push({
      $match: {
        categories: {
          $in: categories,
        },
      },
    });
  }

  if (types?.length) {
    pipeline.push({
      $match: {
        types: {
          $in: types,
        },
      },
    });
  }

  if (date) {
    // Get the start and end of the current week
    let rangeStart, rangeEnd;
    switch (date.value) {
      case "anytime":
        break;
      case "today":
        {
          const today = moment().startOf("day");
          const endOfToday = moment(today).endOf("day");
          rangeStart = today.toDate();
          rangeEnd = endOfToday.toDate();
        }
        break;
      case "tomorrow":
        {
          const tomorrow = moment().add(1, "day").startOf("day");
          const endOfTomorrow = moment(tomorrow).endOf("day");
          rangeStart = tomorrow.toDate();
          rangeEnd = endOfTomorrow.toDate();
        }
        break;
      case "this_week":
        {
          const today = moment();
          const startOfWeek = moment(today).startOf("isoWeek");
          const endOfWeek = moment(startOfWeek).endOf("isoWeek");
          rangeStart = startOfWeek.toDate();
          rangeEnd = endOfWeek.toDate();
        }
        break;
      case "this_weekend":
        {
          const today = moment();
          const startOfWeekend = moment(today)
            .startOf("isoWeek")
            .add(4, "days"); // Set to Friday of this weekend
          const endOfWeekend = moment(startOfWeekend).add(3, "day"); // Set to Sunday of this weekend
          rangeStart = startOfWeekend.toDate();
          rangeEnd = endOfWeekend.toDate();
        }
        break;
      case "picker":
        {
          console.log(moment(date.data.from).toDate());
          rangeStart = moment(date.data.from).startOf("day").toDate();
          rangeEnd = moment(date.data.to).toDate();
        }
        break;
      default:
        // {
        //   const dateToMatch = moment(date).startOf("day");
        //   const endOfDay = moment(dateToMatch).endOf("day");
        //   rangeStart = dateToMatch.toDate();
        //   rangeEnd = endOfDay.toDate();
        // }
        break;
    }
    if (date.value !== "anytime") {
      pipeline.push({
        $match: {
          date: {
            $gte: rangeStart,
            $lte: rangeEnd,
          },
        },
      });
    }
  }

  return pipeline;
};
