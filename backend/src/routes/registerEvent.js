const express = require('express')
const ensureAuthenticated = require('../middleware/beforeProduct.js')
const boolAdmin = require('../middleware/checkAuthor.js');
const registeredSchema = require('../models/admin/allRegisteredEvent.js')
const eventSchema = require('../models/admin/eventRegister.js')
const userSchema = require('../models/userModel/userModel.js');
const app = express.Router()

//this is for staff creating events 
app.post('/adminPost',ensureAuthenticated,boolAdmin,async(req,res)=>{
    try{
        const {} = req.body;
        const queryArray = []
        if(email==='' || eventName===''|| description==='' || venue=== '' || 
        startDate === '' || endDate=== '' )return res.status(400).json({message:"Please send correct input."})
        if(email) queryArray.push({email:{$regex:email,$options:'i'}})
        if(movieName)queryArray.push({movieName:{$regex:movieName,$options:'i'}})

        const dri = await eventSchema.findOne({email,eventName,venue,startDate,endDate});
       
        if(dri){
            return res.status(409).json({message:"Admin already have this kind of movie"
            })
        }
        const data = new eventSchema({email,eventName,description,venue,startDate,endDate});
        await data.save()
       
        ds = new registeredSchema({eventName,description,venue,startDate,endDate});
         await ds.save();
        return res.status(201).json({message:"success! movie submitted",ds,data});
    }catch(err){
        return res.status(500).json({message:`something went wrong movie not fetched`,err})
    }
}
)

//this is admin making users staff like himself
app.post('/authenticate-user',ensureAuthenticated,boolAdmin,async(req,res)=>{
    try{
         const {email,email1} = req.body;
         const ds = await userSchema.findOne({email:{$regex:email1,options:'i'}});
         if(!ds){
            return res.status(404).json({message:"element not found",ds});
         }

        const id = ds._id;
        const da = await userSchema.deleteOne({id});

        if(!da){
            return res.status(400).json({message:"id cannot be deleted",da});
        }
        da.responsibility = true;
        const em = da.email;
        const name = da.name;
        const pass = da.password;
        const resp = da.responsibility
        const d = new userSchema({name,email:em,password:pass,responsibility:resp})
        await d.save();
        return res.status(200).json({message:"Your role assigned as staff",d});
    }
    catch(error){
        return res.status(500).json({message:"Server Failed",error})
    }
})

//convert staff to user by self account;
app.post('/downgrade',ensureAuthenticated,boolAdmin,async(req,res)=>{
    try{
         const {email} = req.body;
         const ds = await userSchema.findOne({email:{$regex:email,options:'i'}});
         if(!ds){
            return res.status(404).json({message:"element not found",ds});
         }

        const id = ds._id;
        const da = await userSchema.deleteOne({id});

        if(!da){
            return res.status(400).json({message:"id cannot be deleted",da});
        }
        da.responsibility = false;
        const em = da.email;
        const name = da.name;
        const pass = da.password;
        const resp = da.responsibility
        const d = new userSchema({name,email:em,password:pass,responsibility:resp})
        await d.save();
        return res.status(200).json({message:"Your assigned as User",d});
    }
    catch(error){
        return res.status(500).json({message:"Server Failed",error})
    }
})

//this is for users and staffs fetching events.
app.get('/fetch',async(req, res)=> {
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
app.delete('/delete/:id',ensureAuthenticated,boolAdmin,async(req,res)=>{
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
