const mongoose = require('mongoose')

//this schema is just the database logs that are created by staffs and everyOne can see them in there dashBoards
const registeredSchema = new mongoose.Schema({
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

module.exports = mongoose.model('events',registeredSchema);