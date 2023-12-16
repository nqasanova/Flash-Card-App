import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Flash Card App</h1>
      <p>General introduction about your app...</p>
      <h2>Projects</h2>
      <ul>
        <li>
          <strong>Project 1:</strong> An Ecommerce website where users can shop for perfumes.
          <a href="https://nqasanova.github.io/La-Grazia_FrontEnd/">Link to Project</a>
        </li>
        <li>
          <strong>Project 2:</strong> This web application fetches product data from the DummyJSON API and dynamically populates a user-friendly webpage. 
          <a href="https://nqasanova.github.io/API-Product-Explorer/">Link to Project</a>
        </li>
        {/* Add more projects as needed */}
      </ul>
    </div>
  );
};

export default Home;
