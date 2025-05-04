import mongoose from "mongoose";

//this schema is database logs that indicate staff with their emails.
const eventSchema = new mongoose.Schema({
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
},{timestamps:true})

const m = mongoose.model("complete",eventSchema)
export default m;
