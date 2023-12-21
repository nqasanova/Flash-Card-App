import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Functional component representing the navigation bar
const Navbar = () => {
  return (
    // Navigation bar container
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/flash-cards" className="nav-link">Flash Cards</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;