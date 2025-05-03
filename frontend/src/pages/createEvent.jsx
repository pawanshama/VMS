import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { Loader2, Text } from "lucide-react";

const CreateEvent = () => {
  const {iscreatingEvent,createUserValidEvent,authUser}  = useAuthStore();
  const [formData,setFormData] = useState({
    email:`${authUser.email}`,
    eventName: "",
    description: "",
    venue:"",
    startDate:"",
    endDate:""
  });
    // handle submit button that runs after submit
    const handleSubmit = async(e)=>{
      e.preventDefault();
      createUserValidEvent(formData);
    }

  return (
    <div>
      <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex flex-col h-full rounded-lg overflow-hidden">
            
        {/* event input */}
       <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Event-Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Text className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Best employee of the month award"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                />
              </div>
            </div>
               {/* description input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Text className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Employee will receive award and bonus"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
                {/* Venue input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">venue</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Text className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Main Auditorium, HQ Building"
                  value={formData.Venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                />
              </div>
            </div>
                {/* startDate input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">startDate</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Text className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="date"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Employee will receive award and bonus"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>
               
               {/* endDate input */}
               {/* startDate input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">endDate</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Text className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="date"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Employee will receive award and bonus"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={iscreatingEvent}>
              {iscreatingEvent ? (
                  <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                  "create"
                )}
            </button>
          </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default CreateEvent

{/* <button
  type="button"
  className="absolute inset-y-0 right-0 pr-3 flex items-center"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <EyeOff className="h-5 w-5 text-base-content/40" />
  ) : (
    <Eye className="h-5 w-5 text-base-content/40" />
  )}
</button> */}