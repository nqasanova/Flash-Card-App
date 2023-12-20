import React from 'react';

const projects = [
  {
    title: 'Personal Website',
    description: 'This website showcases my educational background, contact information, features a Q&A section, and a digital card, providing a comprehensive insight into my profile.',
    link: 'https://nqasanova.github.io/Personal_Website/',
  },
  {
    title: 'API-Product Explorer',
    description: 'This application allows users to explore products, search for specific items, filter by category, and view detailed information about each product.',
    link: 'https://nqasanova.github.io/API-Product-Explorer/',
  },
  {
    title: 'Book Store',
    description: 'This Java application demonstrates a comprehensive implementation of a bookstore database, covering schema design, CRUD operations, transaction handling, and metadata access. ',
    link: 'https://github.com/nqasanova/Java-DB-Bookstore',
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Flash Card App!</h1>
      <h3>My name is Natavan Hasanova and I am a junior CS student at ADA University.</h3>
      <p>Here is a brief info about the list of all the projects I have done so far:</p>

      <div className="project-cards">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;