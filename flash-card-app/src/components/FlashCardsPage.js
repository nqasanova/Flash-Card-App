import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '', status: 'Learned' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortOption, setSortOption] = useState('date'); 

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

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/flashcards');
      setOriginalFlashCardsData(response.data || []);
      sortByDate(response.data); // Initial sorting
    } catch (error) {
      console.error('Error fetching flashcards data:', error);
    }
  };

  const sortByAttribute = (cards, attribute) => {
    switch (attribute) {
      case 'status':
        return [...cards].sort((a, b) => a.status.localeCompare(b.status));
      case 'question':
        return [...cards].sort((a, b) => a.question.localeCompare(b.question));
      // Add more cases based on your requirements
      default:
        return [...cards].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }
  };

  const sortByDate = (cards) => {
    setFlashCardsData(sortByAttribute(cards, sortOption));
  };

  const editCard = async (id, updatedCard) => {
    try {
      const response = await axios.put(`http://localhost:3000/flashcards/${id}`, updatedCard);
      const updatedCards = flashCardsData.map((card) => (card.id === id ? response.data : card));
      sortByDate(updatedCards); // Sorting after editing
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/flashcards/${id}`);
      const filteredCards = flashCardsData.filter((card) => card.id !== id);
      sortByDate(filteredCards); // Sorting after deleting
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const filterByStatus = (status) => {
    const filteredCards = originalFlashCardsData.filter((card) => (status === '' ? true : card.status === status));
    sortByDate(filteredCards); // Sorting after filtering
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus, sortOption]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    filterByStatus(e.target.value);
  };

  const searchCards = () => {
    const query = searchQuery.toLowerCase();
    if (query === '') {
      sortByDate(originalFlashCardsData); // Sorting after clearing search
    } else {
      const filteredCards = originalFlashCardsData.filter(
        (card) =>
          card.question.toLowerCase().includes(query) || card.answer.toLowerCase().includes(query)
      );
      sortByDate(filteredCards); // Sorting after searching
    }
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
          <label className="answer-lab">Answer:</label>
          <input
            type="text"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
        </div>
        <div>
          <label className="status-lab">Status:</label>
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
        <label className="sort-label">Sort by:</label>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Date</option>
          <option value="status">Status</option>
          <option value="question">Question</option>
          {/* Add more options based on your requirements */}
        </select>
      </div>

      {/* Filtering Section */}
      <div>
        <div>
          <label className="filter-status">Filter by Status:</label>
          <select onChange={handleStatusChange}>
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
          <button className="search-button" onClick={searchCards}>
            Search
          </button>
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