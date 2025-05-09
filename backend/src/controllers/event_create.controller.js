import mongoose from "mongoose";
import eventSchema from "../models/admin/eventRegister.js"
import User from '../models/user.model.js'
import moment from "moment"

export const creating = async(req,res)=>{
    console.log(req.body);
    try{
        const {email,eventName,description,venue,startDate,endDate} = req.body;
        const queryArray = []
        if(email==='' || eventName===''|| description==='' || venue=== '' || 
        startDate === '' || endDate=== '' )return res.status(400).json({message:"Please send correct input."})
        if(email) queryArray.push({email:{$regex:email,$options:'i'}})
        if(eventName)queryArray.push({eventName:{$regex:eventName,$options:'i'}})
        if(description)queryArray.push({description:{$regex:description,$options:'i'}})
        if(venue)queryArray.push({venue:{$regex:venue,$options:'i'}})
        if(startDate)queryArray.push({startDate:{$regex:startDate,$options:'i'}})
        if(endDate)queryArray.push({endDate:{$regex:endDate,$options:'i'}})
        

        const dri = await eventSchema.findOne({$and:queryArray});
       
        if(dri){
            return res.status(409).json({message:"Admin already have this kind of event"})
        }
        const data = new eventSchema({email,eventName,description,venue,startDate,endDate});
        await data.save()
        if(!data)return res.status(400).json({message:"Problem to create event"});
        // ds = new registeredSchema({eventName,description,venue,startDate,endDate});
        // await ds.save();
        return res.status(201).json({message:"success! event submitted"});
    }catch(err){
        return res.status(500).json({message:`something went wrong on server`,err})
    }
}

export const user2staff = async(req,res)=>{
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
}

export const staff2user = async(req,res)=>{
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
}

export const new_events = async(req, res)=> {
    // console.log(req.body);
    try{
        // const {email} = req.body;
        // if(email==='')return res.status(404).json({message:`Bad request`});
        const data = await eventSchema.find();
        // const afterThePresentTime = data.filter((item)=>item.timestamps.isAfter(Date.now()));
        // if(!afterThePresentTime){
        //     return res.status(404).json("No event is live");
        // }
        if(!data){
            return res.status(404).json("No event is live")
        }
       return res.status(200).json({message:"Events needs to be updated",data})
    }catch(err){
        return res.status(500).json({message:'error occured',err})
    }
}

export const userSpecificEvent = async(req,res)=>{
    const {email} = req.body;
    // console.log(email);
    try{
        if(email=='')return res.status(404).json({message:`Bad request`});
        const data = await eventSchema.find({email});
        if(!data){
            return res.status(404).json({message:`No events exists`});
        }
        return res.status(201).json({message:`success`,data});
    }
    catch(error){
        return res.status(500).json({message:`Server Internal Problem`,error});
    }
}

export const delete_event = async(req,res)=>{
    try{
         const {id} = req.params.id;
         console.log(id);
         const data = await eventSchema.findById({id});
         console.log(data);
         if(!data){
           return res.status(409).json({message:"this event is already deleted",data});
         }
         const del = await eventSchema.deleteOne({id});
         if(!del){
            return res.status(400).json({message:"problem occured in deletion"})
         }
         return res.status(201).json({message:"event Deleted"});
    }
    catch(err){
       return res.status(500).json({message:"Server Failed"});
    }
}