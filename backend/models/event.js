const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;