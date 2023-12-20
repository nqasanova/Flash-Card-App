import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/flashcards');
      setFlashCardsData(response.data.flashcards || []);
    } catch (error) {
      console.error('Error fetching flashcards data:', error);
    }
  };

  const addCard = async () => {
    try {
      const response = await axios.post('http://localhost:3001/flashcards', newCard);
      setFlashCardsData([...flashCardsData, response.data]);
      setNewCard({ question: '', answer: '' });
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const editCard = async (id, updatedCard) => {
    try {
      const response = await axios.put(`http://localhost:3001/flashcards/${id}`, updatedCard);
      setFlashCardsData(flashCardsData.map((card) => (card.id === id ? response.data : card)));
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/flashcards/${id}`);
      setFlashCardsData(flashCardsData.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Flash Cards</h1>
      <div className="flash-cards-container">
        {flashCardsData.map((card) => (
          <FlashCard key={card.id} card={card} onEdit={editCard} onDelete={deleteCard} />
        ))}
      </div>
      <div>
        <h2>Add New Flash Card:</h2>
        <div>
          <label>Question:</label>
          <input type="text" value={newCard.question} onChange={(e) => setNewCard({ ...newCard, question: e.target.value })} />
        </div>
        <div>
          <label>Answer:</label>
          <input type="text" value={newCard.answer} onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })} />
        </div>
        <button onClick={addCard}>Add Card</button>
      </div>
    </div>
  );
};

export default FlashCardsPage;