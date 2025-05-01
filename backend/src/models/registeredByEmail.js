const mongoose = require('mongoose');

//this schema is for emails that have registered certain events.
const eventBookedSchema = new mongoose.Schema({
     email:{
        Type:String,
        required:true,
     },
     eventName:{
        Type:String,
        required:true
     },
     description:{
        Type:String,
        required:true
     },
     venue:{
        Type:String,
        required:true
     },
     startDate:{
        Type:String,
        required:true
     },
     endDate:{
        Type:String,
        required:true
     }
})

module.exports = mongoose.model("Event-Booked",eventBookedSchema)