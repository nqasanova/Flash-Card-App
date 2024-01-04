import React, { useState } from 'react';
import '../assets/css/FlashCard.css';

// Functional component representing an editable FlashCard
const EditFlashCard = ({ card, onClose, onSave }) => {
  // State to hold the edited content
  const [editedContent, setEditedContent] = useState({ ...card });

  // Function to handle saving the edited content
  const handleSave = () => {
    // Updating the lastModified property before saving
    onSave({ ...editedContent, lastModified: new Date() });
    // Closing the edit mode
    onClose();
  };

  // Function to handle canceling the edit mode
  const handleCancel = () => {
    onClose();
  };

  // JSX rendering of the EditFlashCard component
  return (
    <div className="edit-flash-card-overlay">
      <div className="edit-flash-card">
        <h2>Edit Flash Card</h2>
        {/* Input container for editing the question */}
        <div className="input-container">
          <label className="edit-fcard">Question:</label>
          <input
            type="text"
            value={editedContent.question}
            onChange={(e) => setEditedContent({ ...editedContent, question: e.target.value })}
          />
        </div>
        {/* Input container for editing the answer */}
        <div className="input-container">
          <label className="edit-fcard">Answer:</label>
          <input
            type="text"
            value={editedContent.answer}
            onChange={(e) => setEditedContent({ ...editedContent, answer: e.target.value })}
          />
        </div>
        {/* Input container for editing the status with a dropdown */}
        <div className="input-container">
          <label className="edit-fcard">Status:</label>
          <select
            value={editedContent.status}
            onChange={(e) => setEditedContent({ ...editedContent, status: e.target.value })}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        {/* Container for buttons to save or cancel the editing */}
        <div className="button-container">
          <button onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditFlashCard;