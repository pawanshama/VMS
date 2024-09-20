const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventLead: String,
  eventName: String,
   venue: String,
   award:String,
   maxMember:String,
   age:String,
   endOfDate:String,
   aboutEvent:String,
   phone:String,
   contactTime:String,
   gender:String,
   Branch:String,
   experience:String,
   eventDate:String,
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
