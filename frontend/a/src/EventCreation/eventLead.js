import React,{useState} from 'react'
// import axios from 'axios';

const EventLead = () => {
    const [user,setUser] = useState({Gender:'',Branch:'',Experience:'', EventDate:''});
    const [volunteer, setVolunteer] = useState({ eventLead: '', eventName: '', venue: '',award:'',maxMember:'',age:'',endOfDate:'',aboutEvent:'',phone:'',contactTime:'',gender:'',Branch:'',experience:'',eventDate:'' });
    // const [message, setMessage] = useState('');
    const handleClick = (e)=>{
        setUser((predata)=>({...predata,[e.target.name] : e.target.name}));
        // console.log(user);
    }
    const handlePush=(e)=>{
        setVolunteer((predata)=>({...predata,[e.target.name] : e.target.value}));
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(volunteer);
    }
  return (
    <div>
        <div style={{height:"50px", display:"flex",justifyContent:"center"}}>

          <button style={{margin:"15px",backgroundColor:"#FFFF00", fontSize:"20px"}} name="Gender" onClick={handleClick}>Gender</button>
          <button style={{margin:"15px",backgroundColor:"#FFFF00" ,fontSize:"20px"}} name="Branch" onClick={handleClick}>Branch</button>
          <button style={{margin:"15px",backgroundColor:"#FFFF00" ,fontSize:"20px"}} name="Experience" onClick={handleClick}>Experience</button>
          <button style={{margin:"15px",backgroundColor:"#FFFF00" ,fontSize:"20px"}} name="EventDate" onClick={handleClick}>Event Date</button>
        </div>
         
         <div>
               <div>
                   <form id="myForm" onSubmit={handleSubmit}>
                      {/* <!-- 1. Text Input for Name --> */}
                      <label htmlFor="eventLead">Event Lead  </label>
                      <input type="text" id="eventLead" name="eventLead" autoComplete='eventLead' value={volunteer.eventLead} onChange={handlePush} required /><br />
                      {/* <!-- 1. Text Input for Name --> */}
                      <label htmlFor="eventName">Event Name</label>
                      <input type="text" id="eventName" name="eventName" autoComplete='off' value={volunteer.eventName} onChange={handlePush} required /><br/>
                      
                      {/* <!-- 2. Email Input --> */}
                      <label htmlFor="venue">Venue</label>
                      <input type="text" id="venue" name="venue" onChange={handlePush} value={volunteer.venue} required autoComplete='off'/> <br/>

                      {/* <!-- 2. Award Input --> */}
                      <label htmlFor="award">Award</label>
                      <input type="text" id="award" name="award" onChange={handlePush} value={volunteer.award} required autoComplete='off'/> <br/>

                      {/* <!-- 4. Number Input for Age --> */}
                      <label htmlFor="maxMember">Max members</label>
                      <input type="number" id="maxMember" name="maxMember" onChange={handlePush} value={volunteer.maxMember} min="10" max="200" required autoComplete='off'/><br/>

                      {/* <!-- 4. Number Input for Age --> */}
                      <label htmlFor="age">Age</label>
                      <input type="number" id="age" name="age" min="18" max="99" onChange={handlePush} value={volunteer.age} required autoComplete='off'/><br/>

                      {/* <!-- 5. Date Input for Date of Birth --> */}
                      <label htmlFor="endOfDate">End date to register</label>
                      <input type="date" id="endOfDate" name="endOfDate" onChange={handlePush} value={volunteer.endOfDate} required autoComplete='off'/><br/>

                      <label htmlFor="aboutEvent">About event</label><br />
                      <textarea id="aboutEvent" name="aboutEvent" rows="4" cols="50" onChange={handlePush} value={volunteer.aboutEvent} autoComplete='off'></textarea><br />

                      {/* <!-- 6. Phone Number Input --> */}
                      <label htmlFor="phone">Phone Number:</label>
                      <input type="tel" id="phone" name="phone" onChange={handlePush} value={volunteer.phone} required autoComplete='off'/><br/>

                      {/* <!-- 15. Time Input for Preferred Contact Time --> */}
                      <label htmlFor="contactTime">Preferred Contact Time:</label>
                      <input type="time" id="contactTime" name="contactTime" onChange={handlePush} value={volunteer.contactTime} autoComplete='off'/><br />

                      {/* <!-- 7. Radio Buttons for Gender --> */}
                      {user.Gender === 'Gender' && <div>
                        <label>Gender:</label>
                        <input type="radio" id="male" name="gender" value={volunteer.gender}  onChange={handlePush}/>
                        <label htmlFor="male">Male</label>
                        <input type="radio" id="female" name="gender" value={volunteer.gender} onChange={handlePush}/>
                        <label htmlFor="female">Female</label><br />
                      </div>}

                      {/* <!-- 8. Select Input for Country --> */}
                      {user.Branch === 'Branch' && <div>
                        <label htmlFor="country" >Branch</label>
                        <select id="country" name="Branch" value={volunteer.Branch} onChange={handlePush}>
                          <option> USA</option>
                          <option> Canada</option>
                          <option> India</option>
                          <option> UK</option>
                        </select><br  />
                      </div>}

                      {/* <!-- 10. Range Input for Experience Level --> */}
                      {user.Experience === 'Experience' && 
                      <div>
                        <label htmlFor="experience">Experience (years):</label>
                        <input type="range" id="experience" name="experience" min="0" max="30" step="1" onChange={handlePush} value={volunteer.experience} autoComplete='off'/>
                        <span id="experienceValue">0</span> years<br />
                      </div>
                      }

                      {/* <!-- 5. Date Input for Date of Birth --> */}
                     { user.EventDate === 'EventDate' && <div>
                        <label htmlFor="eventDate">Event date</label>
                        <input type="date" id="eventDate" name="eventDate" value={volunteer.eventDate} onChange={handlePush} required autoComplete='off'/><br/>
                      </div>
                      }

                      {/* <!-- Submit Button --> */}
                      <button type="submit">Submit</button>
                    </form>

               </div>
         </div>
    </div>
  )
}

export default EventLead;
