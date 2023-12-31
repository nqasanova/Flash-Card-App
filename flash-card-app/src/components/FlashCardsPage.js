import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '', status: 'Learned' }); // Add status field

  const addCard = async () => {
    try {
      const response = await axios.post('http://localhost:3000/flashcards', {
        ...newCard,
        lastModified: new Date(),
      });
      setFlashCardsData([...flashCardsData, response.data]);
      setNewCard({ question: '', answer: '', status: 'Learned' }); // Reset status to default
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/flashcards');
      console.log(response.data);
      setFlashCardsData(response.data || []);
    } catch (error) {
      console.error('Error fetching flashcards data:', error);
      if (error.response) {
        console.error('Status code:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received. Request details:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
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

  const filterByStatus = (status) => {
    setFlashCardsData(
      flashCardsData.filter((card) => (status === '' ? true : card.status === status))
    );
  };

  const sortByDate = () => {
    setFlashCardsData(
      [...flashCardsData].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Flash Cards</h1>

      {/* Add New Flash Card Section */}
      <div>
        <h2>Add New Flash Card:</h2>
        <div>
          <label>Question:</label>
          <input 
            type="text"
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          />
        </div>
        <div>
          <label class="answer-lab">Answer:</label>
          <input
            type="text"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
        </div>
        <div>
          <label class="status-lab">Status:</label>
          <select
            value={newCard.status}
            onChange={(e) => setNewCard({ ...newCard, status: e.target.value })}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <button onClick={addCard}>Add Card</button>
      </div>

      {/* Sorting Section */}
      <div>
        <div>
          <label>Status:</label>
          <select onChange={(e) => filterByStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <div>
          <label>Sort by Date:</label>
          <button onClick={sortByDate}>Sort</button>
        </div>
      </div>

      {/* Fetched Cards Section */}
      <div className="flash-cards-container">
        {flashCardsData.map((card) => (
          <FlashCard key={card.id} card={card} onEdit={editCard} onDelete={deleteCard} />
        ))}
      </div>
    </div>
  );
};

export default FlashCardsPage;
