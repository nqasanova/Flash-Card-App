// FlashCard.js
import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card }) => {
  const { question, answer, lastModified, status } = card;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card">
        <div className="card-side front">
          <p>{question}</p>
        </div>
        <div className="card-side back">
          <p>{answer}</p>
          <p>Last Modified: {lastModified}</p>
          <p>Status: {status}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
