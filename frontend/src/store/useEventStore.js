import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
export const useEventStore = create((set,get)=>({
    registered:null,
    iscreatingEvent:null,
    isRegistering:false,
    emailing:null,
    newEvents:null,

  registeredEvent:async()=>{
    try{
        const email = emailing
        const user = await axiosInstance.post("/new/fetch/event",email);
        set({registered:user});
    }
    catch(error){
      console.log("error in registered event:", error);
      toast.error(error.response.data.message);
    }
  },

  deleteRegistered:async(id)=>{
    try {
      const res = await axiosInstance.delete(`/new/delete/:${id}`);
      // set({ authUser: res.data });
      registeredEvent();
      toast.success("Event Deleted");
    } catch (error) {
      console.log("error in deletion:", error);
      toast.error(error.response.data.message);
    }
  },

  createUserValidEvent : async (data) => {
    set({ iscreatingEvent: true });
    try {
      console.log(data);
      const res = await axiosInstance.post("/event/post", data);
      toast.success("created successfully");
    } catch (error) {
      // console.log("error in the authStore....");
      toast.error(error.response.data.message);
    } finally {
      set({ iscreatingEvent: false });
    }
  },

  deleteEvent: async (id) => {
    try {
      const res = await axiosInstance.delete(`/new/delete/:${id}`);
      // set({ authUser: res.data });
      // registeredEvent();
      toast.success("deleted successfully");
    } catch (error) {
      console.log("error in deletion:", error);
      toast.error(error.response.data.message);
    }
  },
  registerEvent : async (data)=>{
        set({isRegistering:true});
        console.log(data);
        console.log(get().emailing);
        console.log(data.email);
        // data.email=emailing
        try{
            const response = await axiosInstance.post("/new/register/event",data);
            toast.success("Registered successfully");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
           set({isRegistering:false})
        }
  },
  fetchNewEvents: async()=>{
    try{
        const response = await axiosInstance.get("/event/fetch");
        set({newEvents:response.data.data});
    }
    catch(error){
        toast.error(error.response.data.message);
    }
  }
}))

// registeredEvent:async()=>{
//     try{
//       const user = await axiosInstance.post("/",authUser.email);
//       set({registered:user});
//     }
//     catch(error){
//       console.log("error in registered event:", error);
//       toast.error(error.response.data.message);
//     }
//   },

//   deleteRegistered:async(id)=>{
//     try {
//       const res = await axiosInstance.delete(`/auth/update-profile/:${id}`);
//       // set({ authUser: res.data });
//       registeredEvent();
//       toast.success("deleted successfully");
//     } catch (error) {
//       console.log("error in deletion:", error);
//       toast.error(error.response.data.message);
//     }
//   },

//   createUserValidEvent : async (data) => {
//     set({ iscreatingEvent: true });
//     try {
//       console.log("error hai")
//       const res = await axiosInstance.post("/event/post", data);
//       toast.success("created successfully");
//     } catch (error) {
//       console.log("error in the authStore....");
//       toast.error(error.response.data.message);
//     } finally {
//       set({ iscreatingEvent: false });
//     }
//   },

//   deleteEvent: async (id) => {
//     try {
//       const res = await axiosInstance.delete(`/update-profile/:${id}`);
//       // set({ authUser: res.data });
//       // registeredEvent();
//       toast.success("deleted successfully");
//     } catch (error) {
//       console.log("error in deletion:", error);
//       toast.error(error.response.data.message);
//     }
//   },
//   registerEvent : async (data)=>{

//         try{

//         }
//         catch(error){

//         }
//         finally{

//         }
//   }