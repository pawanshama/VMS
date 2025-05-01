
const express = require('express');
const {hash} = require('bcryptjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/user/userModel.js');
const app = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new volunteer
app.post('/signUp', async(req, res) => {
  try {
    const responsibility = false;
    const { name,email, password } = req.body;
    if(country.toLowerCase()!=='india' )return res.status(422).json({message:'Country not Exist.'})
    const volunteer = await userSchema.findOne({ name,email, password});
    if (volunteer) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    // else{
        // }
        // responsibility=true;
        // volunteer = await userSchema.findOne({ name,email, password, country});
        // if (volunteer) {
        //     return res.status(400).json({ success: false, message: 'User already exists' });
        // }
        
    // console.log(req.body);
    const hashedPassword = await hash(password,12);
    // console.log(hashedPassword);
    const newVolunteer = new userSchema({ 
        name, email, password:hashedPassword,responsibility
    });
    await newVolunteer.save();
    return res.json({ success: true, message: 'Volunteer registered successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error registering volunteer' });
  }
});

// Login volunteer
app.post('/login',async (req, res) => {
    try{
        const { email, password } = req.body;
        console.log(req.body)
        const volunteer = await userSchema.findOne({email,});
        if (!volunteer) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        
        // console.log(volunteer)
        
        const isMatch = await bcrypt.compare(password, volunteer.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        // console.log(isMatch)
    const token = jwt.sign({ volunteerId: volunteer._id }, JWT_SECRET, { expiresIn: '1h' });
    if(volunteer.responsibility==='true'){
        
        return res.json({success:true,message: token,responsibility:'true' });    
    }
    return res.json({success:true,message: token,responsibility:'false' });
   }catch(err){
    res.json("invalid type")
   }
});

module.exports = app;