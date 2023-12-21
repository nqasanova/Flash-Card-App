import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  // State to hold the contact form information
  const [contactInfo, setContactInfo] = useState({
    subject: '',
    email: '',
    content: '',
  });

  // Function to update the state when input fields change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      console.log('Axios Config:', axios.defaults);

      // Make a POST request to the messages endpoint with the contact information
      await axios.post('http://localhost:3000/messages', contactInfo);

      // Clear the form after successful submission
      setContactInfo({ subject: '', email: '', content: '' });

      // Optionally, show a success message or redirect the user
    } catch (error) {
      // Log an error message if there's an issue with the form submission
      console.error('Error submitting contact form:', error);
    }
  };
  
  // JSX rendering of the Contact component
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-form">
        <label>Subject:</label>
        <input type="text" name="subject" className="subject" value={contactInfo.subject} onChange={handleInputChange} />

        <label>Email Address:</label>
        <input type="text" name="email" className="email" value={contactInfo.email} onChange={handleInputChange} />

        <label>Content:</label>
        <textarea name="content" value={contactInfo.content} onChange={handleInputChange} />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Contact;