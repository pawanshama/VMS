
const express = require('express');
const Event = require('../models/event');
// const Volunteer = require('../models/volunteer');
const router = express.Router();



const validateEvent = (req, res, next) => {
  const { eventLead, endofDate, venue } = req.body;
  
  // Check if 'name' is present and is a string
  if (!eventLead || typeof eventLead !== 'string') {
    return res.status(400).json({ message: "Invalid 'name'. It must be a non-empty string." });
  }
  
  // Check if 'date' is present and is in valid format (ISO 8601, e.g., '2024-09-25')
  const eventDate = new Date(endofDate);
  if (!endofDate || isNaN(eventDate.getTime())) {
    return res.status(400).json({ message: "Invalid 'date'. It must be a valid date in ISO 8601 format." });
  }
  
  // Check if 'location' is present and is a string
  if (!venue || typeof venue !== 'string') {
    return res.status(400).json({ message: "Invalid 'location'. It must be a non-empty string." });
  }
  
  // If all checks pass, call the next middleware or route handler
  next();
};
router.use(express.json());

router.post('/register-event',validateEvent, async (req, res) => {
  
  const { eventLead, eventName, venue,award,maxMember,age,endOfDate,aboutEvent,phone,contactTime,Branch,experience,eventDate,eventTime } = req.body;
  try {

    const newEvent = await new Event({ eventLead, eventName, venue,award,maxMember,age,endOfDate,aboutEvent,phone,contactTime,Branch,experience,eventDate,eventTime });
    await newEvent.save();
    res.status(201).json({ success: true, message: 'Event created', event: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating event', error });
  }
});

// Get all events
router.get('/findAll', async (req,res) => {
  try {
    const events = await Event.find().populate('volunteers');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching events', error });
  }
});
module.exports = router;


















// // const express = require('express');
// // const Event = require('../models/event');
// // const Volunteer = require('../models/volunteer');
// // const router = express.Router();

// // // Get all events
// // router.get('/events', async (req, res) => {
// //   const events = await Event.find();
// //   res.json(events);
// // });

// // // Register volunteer for an event
// // router.post('/register-event/:eventId', async (req, res) => {
// //   const eventId = req.params.eventId;
// //   const volunteerId = req.body.volunteerId; // Assume user is logged in

// //   const event = await Event.findById(eventId);
// //   const volunteer = await Volunteer.findById(volunteerId);

// //   event.volunteers.push(volunteer);
// //   await event.save();

// //   res.json({ message: 'Volunteer registered for event' });
// // });

// // module.exports = router;