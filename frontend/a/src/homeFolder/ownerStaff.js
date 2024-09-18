import React , {component, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const OwnerStaff = (props) => {
  // const SignIn = () => { 
    const {name} = props;
  const [credentials, setCredentials] = useState({ email: '', password: '', organisation:'' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/dashBoard/${name}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data.token) {
        // response.json({ success: true, token:data.token });
        localStorage.setItem('authToken', data.token);
        setMessage('Login successful. You can now register for events.');
        setTimeout(() => {
            navigate(`/dashBoard/${name}/SignUp/page`);
        }, 2000);
      } else {
        setMessage('Invalid email or password.');
      }
    } catch (error) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div>
      <div className="signInContainer">
      <form className="signInForm" onSubmit={handleSubmit}>
        <h1 style={{marginLeft:'5px'}}>Organisation {name}</h1>
        {/* <h2>Sign In</h2> */}
        <p className="message">{message}</p>
        <label>{name} Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        
        <label>{name} Password:</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        
        <label for="activities">Company name:</label>
        <select id="activities" name="activities" multiple>
          <option value="volunteering">Volunteering</option>
          <option value="coding">Coding</option>
          <option value="sports">Sports</option>
          <option value="reading">Reading</option>
          <option value="music">Music</option>
        </select>
        <button type="submit">Sign In</button>
        <Link className='mid' to = {`/dashBoard/${name}/SignUp`}>SignUp</Link>
       </form>   
      </div>
    </div>
  )
}

export default OwnerStaff;
