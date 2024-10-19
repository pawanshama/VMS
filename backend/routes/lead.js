
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LeadSchema = require('../models/leads');
const app = express.Router();

// JWT secret key
const JWT_SECRET = 'your_jwt_secret_key';

// Register a new volunteer
app.post('/SignUp', async(req, res) => {
  try {
    const { email, password, company } = req.body;
    console.log(req.body);
    const newVolunteer = await new LeadSchema({ email, password, company});
    await newVolunteer.save();
    res.json({ success: true, message: 'Volunteer registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error registering volunteer' });
  }
});

// Login volunteer
app.post('/login',async (req, res) => {
  const { email, password, company } = req.body;
  const volunteer = await LeadSchema.findOne({ email, company });
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
