// Import necessary modules and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FlashCardsPage from './components/FlashCardsPage';
import Contact from './components/Contact';
import './App.css';

// Functional component representing the main App
const App = () => {
  return (
    // Wrapping the entire application with the Router
    <Router>
      {/* Rendering the Navbar component */}
      <Navbar />
      <Routes>
        {/* Set the default route to the Home component */}
        <Route path="/Flash-Card-App" element={<Home />} />

        {/* Route for Flash Cards page */}
        <Route path="/flash-cards" element={<FlashCardsPage />} />

        {/* Route for the Contact page */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
