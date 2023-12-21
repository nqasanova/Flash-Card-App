// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FlashCardsPage from './components/FlashCardsPage';
import Contact from './components/Contact'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flash-cards" element={<FlashCardsPage />} />
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </Router>
  );
};

export default App;
