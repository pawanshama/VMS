import React, { useState } from 'react';
import './SignIn.css';
// import { BrowserRouter, Link } from 'react-router-dom';
// import SignUp from './SignUp';
// import SignUp from './SignUp';
import { Link,useNavigate } from 'react-router-dom';
const SignIn = () => { 
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let r = 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data.token) {
        // localStorage.setItem('authToken', data.token);
        setMessage('Login successful. You can now register for events.');
        setTimeout(() => {
            navigate('/dashBoard');
        }, 2000);
      } else {
        r=1;
        setMessage('Invalid email or password.');
      }
    } catch (error) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div className="signInContainer">
      <form className="signInForm" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <p className="message">{message}</p>
        <label>Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        
        <label>Password:</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        
        <button type="submit">Sign In</button>
        <Link className='mid' to = "/SignUp">SignUp</Link>
      </form>
      
    </div>
  );
};

export default SignIn;
