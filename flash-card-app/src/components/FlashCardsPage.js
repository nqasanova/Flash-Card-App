// FlashCardsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';
import './FlashCard.css';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/flashcards');
        setFlashCardsData(response.data); // Remove .flashcards if flashcards is the top-level property
      } catch (error) {
        console.error('Error fetching flashcards data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Flash Cards</h1>
      <div className="flash-cards-container">
        {flashCardsData && flashCardsData.map((card) => (
          <FlashCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FlashCardsPage;
