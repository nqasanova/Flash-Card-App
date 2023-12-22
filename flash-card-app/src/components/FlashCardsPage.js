import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  const addCard = async () => {
    try {
      const response = await axios.post('http://localhost:3001/flashcards', { ...newCard, lastModified: new Date(), status: 'Learned' });
      setFlashCardsData([...flashCardsData, response.data]);
      setNewCard({ question: '', answer: '' });
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

    useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/flashcards');
      console.log(response.data); // Log the response data to check its structure
      setFlashCardsData(response.data || []); // Set flashCardsData directly from response.data
    } catch (error) {
      console.error('Error fetching flashcards data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Status code:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received. Request details:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
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
      <div className="flash-cards-container">
        {flashCardsData.map((card) => (
          <FlashCard key={card.id} card={card} onEdit={editCard} onDelete={deleteCard} />
        ))}
      </div>
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
          <label>Answer:</label>
          <input
            type="text"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
        </div>
        <button onClick={addCard}>Add Card</button>
      </div>
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
    </div>
  );
};

export default FlashCardsPage;
