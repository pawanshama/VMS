const express = require('express')
const eventBookedSchema = require('../../models/registeredByEmail.js')
// const eventSchema = require('../models/admin/eventRegister.js')
const app = express.Router()

//this is for registering events 
app.post('/events',async(req,res)=>{
    try{
        const {email,data} = req.body;
        const {eventName,description,venue,startDate,endDate} = data;
        const queryArray = []
        if(email==='' || eventName===''|| description==='' || venue=== '' || 
        startDate === '' || endDate=== '' )return res.status(400).json({message:"Please send correct input."})

        queryArray.push({email:{$regex:email,$options:'i'}});
        queryArray.push({eventName:{$regex:eventName,$options:'i'}});
        queryArray.push({description:{$regex:description,$options:'i'}});
        queryArray.push({venue:{$regex:venue,$options:'i'}});
        queryArray.push({startDate:{$regex:startDate,$options:'i'}});
        queryArray.push({endDate:{$regex:endDate,$options:'i'}});

        const dri = await eventBookedSchema.findOne({$and:queryArray});
        if(dri){
            return res.status(409).json({message:"Admin already have this kind of movie"
            })
        }
        const da = new eventBookedSchema({email,eventName,description,venue,startDate,endDate});
        await da.save()
        return res.status(201).json({message:"success! event registered",da});
    }catch(err){
        return res.status(500).json({message:`Server Problem`,err})
    }
}
)

//this is for users and staffs fetching events.
app.get('/fetch',async(req, res)=> {
    try{
        const {email} = req.query
        if(email === '') return res.status(404).json({message:'bad request',email})
        const data = await eventBookedSchema.find({email:{$regex:email,$options:'i'}});
        
        if(!data){
            return res.status(404).json("No event is live")
        }
       return res.status(200).json({message:"Events needs to be updated",data})
    }catch(err){
        return res.status(500).json({message:'error occured',err})
    }
})
//this is for staff deleting event.
app.delete('/delete/:id',async(req,res)=>{
     try{
          const {id} = req.params.id;
          console.log(id);
          const data = await eventBookedSchema.findById({id});
          console.log(data);
          if(!data){
            return res.status(409).json({message:"this event is already deleted",data});
          }
          const ds = await eventBookedSchema.deleteOne({id});
          console.log(ds);
          return res.status(201).json({message:"event deleted successfully",ds});
     }
     catch(err){
        return res.status(500).json({message:"Server Failed"});
     }
})

module.exports = app
