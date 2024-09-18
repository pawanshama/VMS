import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LeadSignUp = () => {
  const [volunteer, setVolunteer] = useState({ name: '', email: '', password: '',company:'',responsibilty:'' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVolunteer((preData)=>({ ...preData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/Lead/SignUp', volunteer);
      console.log('successfully done connection');

      const {success,message} = await response.data;
      console.log(success);
      if (success) {
        setMessage('Sign up successful. Please log in.');
        setTimeout(() => {
          navigate('/dashBoard/Lead/SignUp/page');
      }, 2000);
      } else {
        setMessage('Error during sign-up. Try again.');
        console.log(message);
      }
    } catch (error) {
      setMessage('Try again ');
      // console.error(error);
    }
  };

  return (
    <div className="signInContainer">
      <form className="signInForm" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
        <p className="message">{message}</p>
        <label>Name:</label>
        <input type="text" name="name" value={volunteer.name} onChange={handleChange} />
        
        <label>Email:</label>
        <input type="email" name="email" value={volunteer.email} onChange={handleChange} />
        
        <label>Password:</label>
        <input type="password" name="password" value={volunteer.password} onChange={handleChange} />
        
        <label for="activities">Company name:</label>
        <select id="activities" name="activities" multiple>
          <option value="volunteering">Volunteering</option>
          <option value="coding">Coding</option>
          <option value="sports">Sports</option>
          <option value="reading">Reading</option>
          <option value="music">Music</option>
        </select>
        <br/>
        <label>Responsibilities:</label>
        <input style={{marginLeft:"0 px"}}  type="checkbox" id="lead" name="responsibility" value="Lead"/>
        <label style={{marginLeft:"10px"}} for="lead">Lead</label>
        <input style={{marginLeft:"0 px"}}  type="checkbox" id="employee" name="responsibility" value="Staff"/>
        <label style={{marginLeft:"10px"}} for="employee">Employee</label>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LeadSignUp;
