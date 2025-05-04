import mongoose from "mongoose";

//this schema is for emails that have registered certain events.
const eventBookedSchema = new mongoose.Schema({
     email:{
        type:String,
        required:true,
     },
     eventName:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     venue:{
        type:String,
        required:true
     },
     startDate:{
        type:String,
        required:true
     },
     endDate:{
        type:String,
        required:true
     }
})

const us = mongoose.model("EventBooked",eventBookedSchema)
export default us;