const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  availability: [
    {type: String}
  ],
  eventLocation: {type: String, required: true},
  description: {type: String, default: ""},
  creator: {type: String, default: ""},
  creatorID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  startDate: {type: String, default: ""},
  finalDate: {type: String, default: ""},
  finalDay: {type: String, default: ""},
  finalTime: {type: String, default: ""},
  attendees: [
    {
      _id: false,
      id: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: mongoose.mongo.ObjectId()},
      name: {type: String}
    }
  ],
  withdrawn: [
    {
      _id: false,
      id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      name: {type: String}
    }
  ],
  supplies: [
    {
      name: {type: String},
      supply: {type: String},
      amount: {type: Number},
      owed: {type: Number}
    }
  ],
  invitees: [
    {
      _id: false,
      id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      name: {type: String}
    }
  ]
});

module.exports = mongoose.model("Event", EventSchema);