// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll create the CSS next

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">VMS</div>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        {/* Icon for toggle button */}
        <span className="navbar-toggle-icon">&#9776;</span>
      </button>

      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/dashBoard" onClick={toggleNavbar}>Home</Link>
          </li>
          <li>
            <Link to="/events" onClick={toggleNavbar}>Events</Link>
          </li>
          <li>
            <Link to="/volunteerForm" onClick={toggleNavbar}>VolunteerForm</Link>
          </li>
          <li>
            <Link to="/notifications" onClick={toggleNavbar}>Notifications</Link>
          </li>
          <li>
            <Link to="/profile" onClick={toggleNavbar}>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;