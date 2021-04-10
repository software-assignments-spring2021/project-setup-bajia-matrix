const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: Date, required: true},
  eventLocation: {type: String, required: true},
  description: {type: String},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  startDate: {type: Date},
  finalDate: {type: Date},
  attendees: [
    {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  ],
  withdrawn: [
    {type: mongoose.Schema.Types.ObjectId, ref: "User"}
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
    {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  ]
});

module.exports = mongoose.model("Event", EventSchema);