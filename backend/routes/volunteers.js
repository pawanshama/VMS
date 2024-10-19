
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const VolunteerSchema = require('../models/volunteer');
const app = express.Router();

// JWT secret key
const JWT_SECRET = 'your_jwt_secret_key';

// Register a new volunteer
app.post('/SignUp', async(req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const newVolunteer = await new VolunteerSchema({ name, email, password});
    await newVolunteer.save();
    res.json({ success: true, message: 'Volunteer registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error registering volunteer' });
  }
});

// Login volunteer
app.post('/login',async (req, res) => {
  const { email, password } = req.body;
  const volunteer = await VolunteerSchema.findOne({ email });
  if (!volunteer) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, volunteer.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ volunteerId: volunteer._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = app;



// // const express = require('express');
// // const Volunteer = require('../models/volunteer');
// // const router = express.Router();

// // // Register a new volunteer
// // router.post('/register', async (req, res) => {
// //   const { name, email, password } = req.body;
// //   const newVolunteer = new Volunteer({ name, email, password, hours: 0 });
// //   await newVolunteer.save();
// //   res.json({ message: 'Volunteer registered successfully' });
// // });

// // module.exports = router;

