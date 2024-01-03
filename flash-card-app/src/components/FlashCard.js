import React, { useState } from 'react';
import './FlashCard.css';
import EditFlashCard from './EditFlashCard';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const { id, question, answer, lastModified, status } = card;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);

  const handleFlip = (e) => {
    if (!e.target.classList.contains('card-side')) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditingCardId(id);
    }
  };

  const handleEditClose = () => {
    setIsEditing(false);
    setEditingCardId(null);
  };

  const handleEditSave = (editedContent) => {
    onEdit(id, editedContent);
    setIsEditing(false);
    setEditingCardId(null);
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`}>
      {isEditing && editingCardId === id ? (
        <EditFlashCard card={card} onClose={handleEditClose} onSave={handleEditSave} />
      ) : (
        <>
          <div className="card" onClick={handleFlip}>
            <div className="card-side front">
              <p>{question}</p>
            </div>
            <div className="card-side back">
              <p>{answer}</p>
              <hr></hr>
              <p>Last Modified: {lastModified}</p>
              <hr></hr>
              <p>Status: {status}</p>
            </div>
          </div>
          <div className="card-actions">
            <button className="edit-button" onClick={handleEditClick} disabled={isEditing}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashCard;
