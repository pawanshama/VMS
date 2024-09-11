import React, { useEffect, useState, Component } from 'react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications');
    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;

// import React, { useState, useEffect } from 'react';

// // Observable class that manages subscribers
// class AnnouncementSystem {
//   constructor() {
//     this.subscribers = [];
//   }

//   subscribe(fn) {
//     this.subscribers.push(fn);
//   }

//   notify(announcement) {
//     this.subscribers.forEach(fn => fn(announcement));
//   }
// }

// // Instantiate the announcement system (Observable)
// const announcementSystem = new AnnouncementSystem();

// // Volunteer component that listens to announcements
// function Volunteer({ name }) {
//   const [announcement, setAnnouncement] = useState('');

//   useEffect(() => {
//     // Subscribe to the announcement system when the component mounts
//     const handleAnnouncement = (newAnnouncement) => {
//       setAnnouncement(newAnnouncement);
//     };
//     announcementSystem.subscribe(handleAnnouncement);

//     return () => {
//       // Cleanup function: if component unmounts, stop receiving announcements
//       // In a real app, you'd also remove the subscription from the observable
//     };
//   }, []);

//   return (
//     <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
//       <h3>Volunteer: {name}</h3>
//       <p>Current Announcement: {announcement ? announcement : 'No announcement yet'}</p>
//     </div>
//   );
// }

// // Main App component
// function Notification() {
//   const [newAnnouncement, setNewAnnouncement] = useState('');

//   const handleMakeAnnouncement = () => {
//     // Notify all subscribers (volunteers) with the new announcement
//     announcementSystem.notify(newAnnouncement);
//   };

//   return (
//     <div>
//       <h1>Volunteer Management System</h1>
      
//       <div>
//         <h2>Make an Announcement</h2>
//         <input
//           type="text"
//           value={newAnnouncement}
//           onChange={(e) => setNewAnnouncement(e.target.value)}
//           placeholder="Enter announcement here"
//         />
//         <button onClick={handleMakeAnnouncement}>Notify All Volunteers</button>
//       </div>

//       <div>
//         <h2>Volunteers</h2>
//         <Volunteer name="Alice" />
//         <Volunteer name="Bob" />
//         <Volunteer name="Charlie" />
//       </div>
//     </div>
//   );
// }

// export default Notification;