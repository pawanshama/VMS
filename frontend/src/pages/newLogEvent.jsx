import React, { useEffect, useState } from 'react'
import { useEventStore } from '../store/useEventStore';
const NewLogEvent = () => {
    // const [data,setData] = useState(null);
    // const {} = useEventStore();
    const {fetchNewEvents,registerEvent,iscreatingEvent,newEvents,isRegistering} = useEventStore();
    const us = "";
    // const Registered = [
    //     {
    //       name: "Innovation Week Kickoff",
    //       description: "A launch event featuring keynote speakers and team challenges focused on innovation.",
    //       venue: "Main Auditorium, HQ Building",
    //       startDate: "May 15, 2025",
    //       endDate: "May 15, 2025"
    //     },
    //     {
    //       name: "Annual Sales Summit",
    //       description: "A three-day summit to review performance, strategy, and upcoming targets.",
    //       venue: "Conference Room A & B, Tower 3",
    //       startDate: "June 1, 2025",
    //       endDate: "June 3, 2025"
    //     },
    //     {
    //       name: "Wellness Fair",
    //       description: "A company-wide health and wellness event including yoga sessions, nutrition talks, and medical checkups.",
    //       venue: "Outdoor Pavilion & Cafeteria Lawn",
    //       startDate: "July 10, 2025",
    //       endDate: "July 10, 2025"
    //     }
    //   ];

    
    useEffect(()=>{
      fetchNewEvents();
      // console.log(newEvents);
    },[us])


      //register of event from the list. so that new events can be seen on the top.
      const handleRegister = (id) => {
          // console.log(id);
          const data = newEvents.filter(item=>(item._id===id));
          // console.log(data);
            registerEvent(data[0]);
      };

  return (
    <div className="h-auto pb-20 bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-full">
          <div className="flex flex-col h-full rounded-lg overflow-hidden">
            
    {/* <div className='mt-16'> */}
       {
          newEvents && newEvents.map((el,index)=>{
               return (
                   <div key={index} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
                    <h2 className="text-xl font-semibold
                     text-gray-800 mb-2">{el.eventName} <span className='font-bold text-sm text-green-700 '>new</span></h2>
                    <p className="text-gray-600
                     mb-3">{el.description}</p>
                    <div className="text-sm text-gray-500 mb-1">
                        <span className="font-medium text-gray-700">
                            Venue:</span> {el.venue}</div>
                    <div className="text-sm text-gray-500 
                    mb-1"><span className="font-medium 
                    text-gray-700">Start Date:</span> {el.startDate}</div>
                    <div className="text-sm 
                    text-gray-500"><span className="font-medium 
                    text-gray-700">End Date:</span> {el.endDate}</div>

                    <button
                        onClick={() => handleRegister(el._id)} disabled={isRegistering}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                        >
                        register
                    </button>
                </div>
            )
        })
    }
    {/* </div> */}
          </div>
         </div>
       </div>
    </div>
  )
}

export default NewLogEvent
