import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { EmailShareButton, EmailIcon } from 'react-share';
import FlashCard from './FlashCard';

const FlashCardsPage = () => {
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '', status: 'Learned' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [selectedCards, setSelectedCards] = useState([]);
  const [originalFlashCardsData, setOriginalFlashCardsData] = useState([]);
  const [page, setPage] = useState(1); 

  const containerRef = useRef(null);

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
      const response = await axios.get(`http://localhost:3000/flashcards?page=${page}`);
      const newData = response.data || [];
  
      // Combine existing filters with new data
      const filteredData = newData
        .filter((card) => (selectedStatus === '' ? true : card.status === selectedStatus))
        .filter((card) => (searchQuery === '' ? true : card.question.toLowerCase().includes(searchQuery) || card.answer.toLowerCase().includes(searchQuery)));
  
      // Update originalFlashCardsData with the filtered and sorted data
      setOriginalFlashCardsData([...filteredData]);
  
      // Sort the updated flash cards
      sortByDate(filteredData);
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
      default:
        return [...cards].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }
  };

  const sortByDate = (cards) => {
    setFlashCardsData(sortByAttribute(cards, sortOption));
  };

  const editCard = async (id, updatedCard) => {
    try {
      // Update the flash card on the server
      await axios.put(`http://localhost:3000/flashcards/${id}`, updatedCard);

      // Fetch the updated flash cards from the server
      const updatedData = await axios.get(`http://localhost:3000/flashcards?page=${page}`);
      const updatedCards = updatedData.data || [];

      // Set the updated flash cards and sort them
      setOriginalFlashCardsData(updatedCards);
      sortByDate(updatedCards);
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
    const sortedFilteredCards = sortByAttribute(filteredCards, sortOption);
    setFlashCardsData(sortedFilteredCards);
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus, sortOption, page]);
  
  useEffect(() => {
    const container = containerRef.current;
  
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom, and only fetch data if the container is scrollable
      if (container.scrollHeight > container.clientHeight && container.scrollTop + container.clientHeight >= container.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    container.addEventListener('scroll', handleScroll);
  
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, page]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    filterByStatus(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    const updatedSelectedCards = [...selectedCards];
    const index = updatedSelectedCards.indexOf(id);

    if (index !== -1) {
      updatedSelectedCards.splice(index, 1);
    } else {
      updatedSelectedCards.push(id);
    }

    setSelectedCards(updatedSelectedCards);
  };

  const shareSelectedCards = () => {
    const selectedCardDetails = selectedCards.map((id) => {
      const selectedCard = flashCardsData.find((card) => card.id === id);
      return {
        question: selectedCard.question,
        answer: selectedCard.answer,
        status: selectedCard.status,
      };
    });

    const emailBody = JSON.stringify(selectedCardDetails, null, 2);
    const emailSubject = 'Flash Cards Selection';

    // Open the default mail client with the selected cards details
    window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
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
    <div style={{ margin: 0, padding: 0 }}>
    <div ref={containerRef} style={{ overflowY: 'auto', height: '1000px' }}>
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
      <div>
        <button onClick={shareSelectedCards} disabled={selectedCards.length === 0}>
          Share Selected Cards
        </button>
      </div>

      {/* Fetched Cards Section */}
      <div className="flash-cards-container">
        {flashCardsData.map((card) => (
          <FlashCard
            key={card.id}
            card={card}
            onEdit={editCard}
            onDelete={deleteCard}
            onSelect={() => handleCheckboxChange(card.id)}
            isSelected={selectedCards.includes(card.id)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default FlashCardsPage;
