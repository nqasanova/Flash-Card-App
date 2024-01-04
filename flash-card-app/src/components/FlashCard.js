import React, { useState } from 'react';
import '../assets/css/FlashCard.css';
import EditFlashCard from './EditFlashCard';

// Functional component representing a FlashCard
const FlashCard = ({ card, onEdit, onDelete, onSelect, isSelected }) => {
  // Destructuring properties from the card object
  const { id, question, answer, lastModified, status } = card;

  // State for managing card flipping
  const [isFlipped, setIsFlipped] = useState(false);

  // State for managing card editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);

  // Function to handle card flipping
  const handleFlip = (e) => {
    if (!e.target.classList.contains('card-side')) {
      setIsFlipped(!isFlipped);
    }
  };

  // Function to handle the "Edit" button click
  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditingCardId(id);
    }
  };

  // Function to handle closing the edit mode
  const handleEditClose = () => {
    setIsEditing(false);
    setEditingCardId(null);
  };

  // Function to handle saving edited content
  const handleEditSave = (editedContent) => {
    onEdit(id, editedContent);
    setIsEditing(false);
    setEditingCardId(null);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    onSelect(id, !isSelected);
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`}>
      {isEditing && editingCardId === id ? (
        // Displaying the EditFlashCard component in edit mode
        <EditFlashCard card={card} onClose={handleEditClose} onSave={handleEditSave} />
      ) : (
        // Displaying the regular FlashCard content
        <>
          {/* Checkbox for card selection */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="card-checkbox"
          />

          {/* Card content with front and back sides */}
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

          {/* Card action buttons */}
          <div className="card-actions">
            {/* "Edit" button */}
            <button className="edit-button" onClick={handleEditClick} disabled={isEditing}>
              Edit
            </button>
            {/* "Delete" button */}
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