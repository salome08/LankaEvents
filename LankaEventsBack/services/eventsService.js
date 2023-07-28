const mongoose = require("mongoose");
const Event = require("../models/Event");

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
      }).select("_id");
      const eventsIds = events.map((el) => el._id);
      return eventsIds;
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
