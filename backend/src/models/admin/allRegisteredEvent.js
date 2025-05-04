import mongoose from "mongoose";

//this schema is just the database logs that are created by staffs and everyOne can see them in there dashBoards
const registeredSchema = new mongoose.Schema({
    email:{
       type:String,
       required:true
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

const m = mongoose.model('event',registeredSchema);
export default m;