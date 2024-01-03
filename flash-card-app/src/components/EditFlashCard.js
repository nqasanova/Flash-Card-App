import React, { useState } from 'react';
import '../assets/css/FlashCard.css';

const EditFlashCard = ({ card, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState({ ...card });

  const handleSave = () => {
    onSave({ ...editedContent, lastModified: new Date() });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="edit-flash-card-overlay">
      <div className="edit-flash-card">
        <h2>Edit Flash Card</h2>
        <div className="input-container">
          <label className="edit-fcard">Question:</label>
          <input
            type="text"
            value={editedContent.question}
            onChange={(e) => setEditedContent({ ...editedContent, question: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label className="edit-fcard">Answer:</label>
          <input
            type="text"
            value={editedContent.answer}
            onChange={(e) => setEditedContent({ ...editedContent, answer: e.target.value })}
          />
        </div>
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
        <div className="button-container">
          <button onClick={handleSave}>Save</button>
          <button class="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditFlashCard;