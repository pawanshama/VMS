import React, { useState } from 'react';

const VolunteerForm = () => {
  const [volunteer, setVolunteer] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call to register user
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(volunteer),
    }).then((response) => response.json());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={volunteer.name} onChange={handleChange} />
      
      <label>Email:</label>
      <input type="email" name="email" value={volunteer.email} onChange={handleChange} />
      
      <label>Password:</label>
      <input type="password" name="password" value={volunteer.password} onChange={handleChange} />
      
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default VolunteerForm;
