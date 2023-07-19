const mongoose = require("mongoose");
const Event = require("../models/Event");

module.exports = {
  profile: async (req, res) => {
    let u = await User.findOne({ _id: req.user.userId });
    res.apiSuccess(u);
  },
  create: (eventInfos) => {
    const event = new Event({
      _id: new mongoose.Types.ObjectId(),
      ...eventInfos,
    });
    return event.save();
  },
  find: (filter) => {
    const events = Events.find(filter);
    return events;
  },
  findOne: (filter) => {
    const content = Contents.findOne(filter);
    return content;
  },
  findById: (id) => {
    const content = Contents.findById(id);
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
