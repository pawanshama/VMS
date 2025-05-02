import express from "express"
import registeredSchema from "../models/admin/allRegisteredEvent.js"
import eventSchema from "../models/admin/eventRegister.js"
import User from '../models/user.model.js'
import { protectRoute } from "../middleware/auth.middleware.js"
const app = express.Router()

//This is creation of an event 
app.post('/adminPost',async(req,res)=>{
    
    try{
        const {email,eventName,description,venue,startDate,endDate} = req.body;
        const queryArray = []
        if(email==='' || eventName===''|| description==='' || venue=== '' || 
        startDate === '' || endDate=== '' )return res.status(400).json({message:"Please send correct input."})
        if(email) queryArray.push({email:{$regex:email,$options:'i'}})
        if(eventName)queryArray.push({eventName:{$regex:eventName,$options:'i'}})

        const dri = await eventSchema.findOne({email,eventName,venue,startDate,endDate});
       
        if(dri){
            return res.status(409).json({message:"Admin already have this kind of movie"
            })
        }
        const data = new eventSchema({email,eventName,description,venue,startDate,endDate});
        await data.save()
       
        ds = new registeredSchema({eventName,description,venue,startDate,endDate});
         await ds.save();
        return res.status(201).json({message:"success! event submitted"});
    }catch(err){
        return res.status(500).json({message:`something went wrong on server`,err})
    }
}
)

//this is admin making users staff like himself
app.post('/authenticate-user',protectRoute,async(req,res)=>{
    try{
         const {email,email1} = req.body;
         const ds = await User.findOne({email:{$regex:email1,options:'i'}});
         if(!ds){
            return res.status(404).json({message:"element not found",ds});
         }

        const id = ds._id;
        const da = await User.deleteOne({id});

        if(!da){
            return res.status(400).json({message:"id cannot be deleted",da});
        }
        da.responsibility = true;
        const em = da.email;
        const name = da.name;
        const pass = da.password;
        const resp = da.responsibility
        const d = new User({name,email:em,password:pass,responsibility:resp})
        await d.save();
        return res.status(200).json({message:"Your role assigned as staff",d});
    }
    catch(error){
        return res.status(500).json({message:"Server Failed",error})
    }
})

//convert staff to user by self account;
app.post('/downgrade',protectRoute,async(req,res)=>{
    try{
         const {email} = req.body;
         const ds = await User.findOne({email:{$regex:email,options:'i'}});
         if(!ds){
            return res.status(404).json({message:"element not found",ds});
         }

        const id = ds._id;
        const da = await User.deleteOne({id});

        if(!da){
            return res.status(400).json({message:"id cannot be deleted",da});
        }
        da.responsibility = false;
        const em = da.email;
        const name = da.name;
        const pass = da.password;
        const resp = da.responsibility
        const d = new User({name,email:em,password:pass,responsibility:resp})
        await d.save();
        return res.status(200).json({message:"Your assigned as User",d});
    }
    catch(error){
        return res.status(500).json({message:"Server Failed",error})
    }
})

//this is for users and staffs fetching events.
app.get('/fetch',protectRoute,async(req, res)=> {
    try{
        
        const data = await registeredSchema.find({});
        
        if(!data){
            return res.status(404).json("No event is live")
        }
       return res.status(200).json({message:"Events needs to be updated",data})
    }catch(err){
        return res.status(500).json({message:'error occured',err})
    }
})
//this is for staff deleting event.
app.delete('/delete/:id',protectRoute,async(req,res)=>{
     try{
          const {id} = req.params._id;
          console.log(id);
          const data = await eventSchema.findById({id});
          console.log(data);
          if(!data){
            return res.status(409).json({message:"this event is already deleted",data});
          }
     }
     catch(err){
        return res.status(500).json({message:"Server Failed"});
     }
})

module.exports = app
