const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventLead: String,
  eventName: String,
  venue: String,
  award:String,
  maxMember:String,
  age:String,
  endOfDate:Date,
  aboutEvent:String,
  phone:String,
  contactTime:String,
  gender:String,
  Branch:String,
  experience:String,
  eventDate:Date,
  eventTime:Date,
},{
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
