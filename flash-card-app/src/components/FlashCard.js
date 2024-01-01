import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const { id, question, answer, lastModified, status } = card;
  const [isFlipped, setIsFlipped] = useState(false);
  const [editedContent, setEditedContent] = useState({ question, answer });

  const handleFlip = (e) => {
    if (!e.target.classList.contains('card-side')) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleEdit = () => {
    onEdit(id, { ...editedContent, lastModified: new Date(), status });
    setIsFlipped(false);
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card" onClick={handleFlip}>
        <div className="card-side front">
          <p>{question}</p>
        </div>
        <div className="card-side back">
          <p>{answer}</p>
          <p>Last Modified: {lastModified}</p>
          <p>Status: {status}</p>
        </div>
      </div>
      <div className="card-actions">
        <button className="edit-button" onClick={(e) => { handleEdit(); e.stopPropagation(); }}>
          Edit
        </button>
        <button className="delete-button" onClick={(e) => { onDelete(id); e.stopPropagation(); }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlashCard;