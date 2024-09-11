
const express = require('express');
const mongoose = require('mongoose');
const volunteerRoutes = require('./routes/volunteers');
const cors = require('cors');


const eventRoutes = require('./routes/events');
require('dotenv').config(); // Load environment variables from .env file

// const mongoURI = process.env.MONGO_URI;
// const jwtSecret = process.env.JWT_SECRET || 'mySecretKey'; // Use fallback for local dev
const x = "mongodb+srv://pawansharma02020200:RcHVi5BZEZ4sys2j@vms.tqk8k.mongodb.net/?retryWrites=true&w=majority&appName=VMS";

const app = express();
//Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection string (Use your Atlas connection string here)
const mongoURI = x;

// Connect to MongoDB , useUnifiedTopology: true, , {useNewUrlParser: true}
mongoose.connect(mongoURI,{useNewUrlParser: true ,useUnifiedTopology: true})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// const user = require('./models/volunteer');


// Routes
app.use('/register', volunteerRoutes);
app.use('/events', eventRoutes);

// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     console.log(req.body);
//     const newVolunteer = await new volunteerRoutes({ name, email, password});
//     await newVolunteer.save();
//     res.json({ success: true, message: 'Volunteer registered successfully' });
//   } catch (error) {
//     res.status(400).json({ success: false, message: 'Error registering volunteer' });
//   }
// });


app.listen(8000, () => {
  console.log('Server running on port 8000')
});
