import express from "express";
import eventBookedSchema from '../../models/registeredByEmail.js'
// const eventSchema = require('../models/admin/eventRegister.js')
const app = express.Router()

//this is for registering events 
app.post('/register/event',async(req,res)=>{
    console.log(req.body);
    try{
        const {email,eventName,description,venue,startDate,endDate} = req.body;
        if(email==='' || eventName===''|| description==='' || venue=== '' || 
        startDate === '' || endDate=== '' )return res.status(404).json({message:"Please send correct input."})

        const dri = await eventBookedSchema.findOne({email,eventName,description,venue,startDate,endDate});
        if(dri){
            return res.status(409).json({message:`Event already registered by ${dri[0].email}`})
        }
        // console.log("dri",dri);
        const da = new eventBookedSchema({email,eventName,description,venue,startDate,endDate});
        await da.save()
        // console.log("da",da);
        if(!da){
            return res.status(401).json({message:"event register failed"});
        }
        return res.status(201).json({message:"success! event registered",da});
    }catch(err){
        return res.status(500).json({message:`Server Problem`,err})
    }
}
)

//This is for users and staffs fetching registered events.
app.post('/fetch/event',async(req, res)=> {
    // console.log()/
    try{
        const {email} = req.body;
        console.log(typeof(email));
        if(email === '') return res.status(404).json({message:'bad request',email})
        const data = await eventBookedSchema.find({email});
        console.log(data);
        if(data.length===0){
            return res.status(404).json({message:"No event is live",data});
        }
       return res.status(200).json({message:"Events needs to be updated",data})
    }catch(err){
        return res.status(500).json({message:'error occured',err})
    }
})
//this is for user deleting registered event in his history.
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
          return res.status(201).json({message:"event deleted successfully"});
     }
     catch(err){
        return res.status(500).json({message:"Server Failed"});
     }
})

export default app
