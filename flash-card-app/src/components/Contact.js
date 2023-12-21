// Contact.js
import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    subject: '',
    email: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log('Axios Config:', axios.defaults);
      await axios.post('http://localhost:3000/messages', contactInfo);
      setContactInfo({ subject: '', email: '', content: '' });
      // Optionally, show a success message or redirect the user
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };
  
  

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
