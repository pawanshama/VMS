import React, { useEffect, useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    await fetch('http://localhost:8000/events/register-event')
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  const registerForEvent = (eventId) => {
    const token = localStorage.getItem('authToken');
    fetch(`/register-event/${eventId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Pass token in Authorization header
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Successfully registered for the event!');
      } else {
        alert('Please log in to register for events.');
      }
    });
  };
  

  return (
    <div>
      <h2>Available Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.name}
            <button onClick={() => registerForEvent(event._id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;