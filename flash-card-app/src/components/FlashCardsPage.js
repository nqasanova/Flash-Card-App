import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '', status: 'Learned' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [originalFlashCardsData, setOriginalFlashCardsData] = useState([]);

  const addCard = async () => {
    try {
      const response = await axios.post('http://localhost:3000/flashcards', {
        ...newCard,
        lastModified: new Date(),
      });
      setFlashCardsData([...flashCardsData, response.data]);
      setOriginalFlashCardsData([...originalFlashCardsData, response.data]); 
      setNewCard({ question: '', answer: '', status: 'Learned' });
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/flashcards');
      setFlashCardsData(response.data || []);
      setOriginalFlashCardsData(response.data || []); 
    } catch (error) {
      console.error('Error fetching flashcards data:', error);
    }
  };

  const editCard = async (id, updatedCard) => {
    try {
      const response = await axios.put(`http://localhost:3000/flashcards/${id}`, updatedCard);
      setFlashCardsData(flashCardsData.map((card) => (card.id === id ? response.data : card)));
      setOriginalFlashCardsData(originalFlashCardsData.map((card) => (card.id === id ? response.data : card))); 
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/flashcards/${id}`);
      setFlashCardsData(flashCardsData.filter((card) => card.id !== id));
      setOriginalFlashCardsData(originalFlashCardsData.filter((card) => card.id !== id)); 
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const filterByStatus = (status) => {
    setFlashCardsData(
      originalFlashCardsData.filter((card) => (status === '' ? true : card.status === status))
    );
  };

  const sortByDate = () => {
    setFlashCardsData(
      [...flashCardsData].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    );
  };

  const searchCards = () => {
    const query = searchQuery.toLowerCase();
    if (query === '') {
      setFlashCardsData(originalFlashCardsData);
    } else {
      setFlashCardsData(
        originalFlashCardsData.filter(
          (card) =>
            card.question.toLowerCase().includes(query) || card.answer.toLowerCase().includes(query)
        )
      );
    }
  };

  // Inside the JSX where you render the status filter dropdown
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    filterByStatus(e.target.value);
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

      {/* Filtering Section */}
      <div>
        <div>
          <label class="filter-status">Filter by Status:</label>
          <select onChange={(e) => filterByStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <div>
          <label>Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={searchCards}>Search</button>
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
