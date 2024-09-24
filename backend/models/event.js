const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventLead: String,
  eventName: String,
  venue: String,
  award:String,
  maxMember:Number,
  age:Number,
  endOfDate:Date,
  aboutEvent:String,
  phone:Number,
  contactTime:String,
  Branch:String,
  experience:String,
  eventDate:Date,
  eventTime:Date,
},{
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
