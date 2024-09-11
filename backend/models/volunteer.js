const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const volunteerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  // hours: { 
  //   type: Number, 
  //   default: 0 
  // },
});

// Hash password before saving
volunteerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;


// const mongoose = require('mongoose');

// const volunteerSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   hours: Number,
// });

// const Volunteer = mongoose.model('Volunteer', volunteerSchema);

// module.exports = Volunteer;
