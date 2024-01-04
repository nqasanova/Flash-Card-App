// Importing necessary dependencies from 'react'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { EmailShareButton, EmailIcon } from 'react-share';

// Importing the FlashCard component
import FlashCard from './FlashCard';

// Functional component representing the Flash Cards page
const FlashCardsPage = () => {
  // State for managing flash card data
  const [flashCardsData, setFlashCardsData] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '', status: 'Learned' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [selectedCards, setSelectedCards] = useState([]);
  const [originalFlashCardsData, setOriginalFlashCardsData] = useState([]);
  const [page, setPage] = useState(1);

  // Ref for the container element
  const containerRef = useRef(null);

  // Function to add a new flash card
  const addCard = async () => {
    try {
      // Making a POST request to add a new flash card
      const response = await axios.post('http://localhost:3000/flashcards', {
        ...newCard,
        lastModified: new Date(),
      });
      
      // Updating the flash card data with the response data
      setFlashCardsData([...flashCardsData, response.data]);
      setOriginalFlashCardsData([...originalFlashCardsData, response.data]);
      
      // Resetting the new card state
      setNewCard({ question: '', answer: '', status: 'Learned' });
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  // Function to fetch flash card data based on filters
  const fetchData = async () => {
    try {
      // Making a GET request to fetch flash card data
      const response = await axios.get(`http://localhost:3000/flashcards?page=${page}`);
      const newData = response.data || [];

      // Filtering the data based on selected status and search query
      const filteredData = newData
        .filter((card) => (selectedStatus === '' ? true : card.status === selectedStatus))
        .filter((card) => (searchQuery === '' ? true : card.question.toLowerCase().includes(searchQuery) || card.answer.toLowerCase().includes(searchQuery)));

      // Updating originalFlashCardsData with the filtered and sorted data
      setOriginalFlashCardsData([...filteredData]);

      // Sorting the updated flash cards
      sortByDate(filteredData);
    } catch (error) {
      console.error('Error fetching flashcards data:', error);
    }
  };

  // Function to sort flash cards by a specified attribute
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

  // Function to sort flash cards by date
  const sortByDate = (cards) => {
    setFlashCardsData(sortByAttribute(cards, sortOption));
  };

  // Function to edit a flash card
  const editCard = async (id, updatedCard) => {
    try {
      // Making a PUT request to update a flash card
      await axios.put(`http://localhost:3000/flashcards/${id}`, updatedCard);

      // Fetching the updated flash cards from the server
      const updatedData = await axios.get(`http://localhost:3000/flashcards?page=${page}`);
      const updatedCards = updatedData.data || [];

      // Setting the updated flash cards and sorting them
      setOriginalFlashCardsData(updatedCards);
      sortByDate(updatedCards);
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  // Function to delete a flash card
  const deleteCard = async (id) => {
    try {
      // Making a DELETE request to delete a flash card
      await axios.delete(`http://localhost:3000/flashcards/${id}`);

      // Filtering out the deleted card and sorting the remaining cards
      const filteredCards = flashCardsData.filter((card) => card.id !== id);
      sortByDate(filteredCards);
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  // Function to filter flash cards based on status
  const filterByStatus = (status) => {
    const filteredCards = originalFlashCardsData.filter((card) => (status === '' ? true : card.status === status));
    const sortedFilteredCards = sortByAttribute(filteredCards, sortOption);
    setFlashCardsData(sortedFilteredCards);
  };

  // Effect hook to fetch data when selectedStatus, sortOption, or page changes
  useEffect(() => {
    fetchData();
  }, [selectedStatus, sortOption, page]);

  // Effect hook to handle infinite scrolling
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      // Check if the user has scrolled to the bottom
      if (container.scrollHeight > container.clientHeight && container.scrollTop + container.clientHeight >= container.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    // Adding a scroll event listener to the container
    container.addEventListener('scroll', handleScroll);

    // Cleanup: Removing the scroll event listener
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, page]);

  // Function to handle changes in status dropdown
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    filterByStatus(e.target.value);
  };

  // Function to handle checkbox changes for selected cards
  const handleCheckboxChange = (id) => {
    const updatedSelectedCards = [...selectedCards];
    const index = updatedSelectedCards.indexOf(id);

    // Toggle selection
    if (index !== -1) {
      updatedSelectedCards.splice(index, 1);
    } else {
      updatedSelectedCards.push(id);
    }

    setSelectedCards(updatedSelectedCards);
  };

  // Function to share selected cards via email
  const shareSelectedCards = () => {
    const selectedCardDetails = selectedCards.map((id) => {
      const selectedCard = flashCardsData.find((card) => card.id === id);
      return {
        question: selectedCard.question,
        answer: selectedCard.answer,
        status: selectedCard.status,
      };
    });

    // Creating email body with JSON stringified selected card details
    const emailBody = JSON.stringify(selectedCardDetails, null, 2);
    const emailSubject = 'Flash Cards Selection';

    // Opening the default mail client with the selected cards details
    window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  // Function to search for cards based on the query
  const searchCards = () => {
    const query = searchQuery.toLowerCase();

    if (query === '') {
      sortByDate(originalFlashCardsData); // Sorting after clearing search
    } else {
      // Filtering and sorting after searching
      const filteredCards = originalFlashCardsData.filter(
        (card) =>
          card.question.toLowerCase().includes(query) || card.answer.toLowerCase().includes(query)
      );
      sortByDate(filteredCards);
    }
  };

  // JSX rendering of the FlashCardsPage component
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

        {/* Share Selected Cards Section */}
        <div>
          <button onClick={shareSelectedCards} disabled={selectedCards.length === 0}>
            Share Selected Cards
          </button>
        </div>

        {/* Fetched Cards Section */}
        <div className="flash-cards-container">
          {/* Mapping through flash card data and rendering FlashCard components */}
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

// Exporting the FlashCardsPage component as the default export
export default FlashCardsPage;
