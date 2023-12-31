import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const { id, question, answer, lastModified, status } = card;
  const [isFlipped, setIsFlipped] = useState(false);
  const [editedContent, setEditedContent] = useState({ question, answer });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleEdit = () => {
    onEdit(id, { ...editedContent, lastModified: new Date(), status });
    setIsFlipped(false);
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
      <div className="card-actions">
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlashCard;