const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  availability: [
    {type: String, required: true}
  ],
  eventLocation: {type: String, required: true},
  description: {type: String},
  creator: {type: String, required: true},
  creatorID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  startDate: {type: String},
  finalDate: {type: Date},
  attendees: [
    {
      _id: false,
      id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
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
      supply: {type: String},
      name: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
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