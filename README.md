# Flash-Card-App

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
  - [Flash Card Management](#flash-card-management)
  - [Display and Interaction](#display-and-interaction)
  - [Bonus Features](#bonus-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Project Functionality](#project-functionality)
  - [Flash Card Management](#flash-card-management-1)
    - [Creating Cards](#creating-cards)
    - [Editing Cards](#editing-cards)
    - [Deleting Cards](#deleting-cards)
  - [Display and Interaction](#display-and-interaction-1)
    - [Interactive Cards](#interactive-cards)
    - [Searching Cards](#searching-cards)
    - [Filtering and Sorting](#filtering-and-sorting)
  - [Bonus Features](#bonus-features-1)
    - [Share Function](#share-function)
- [Conclusion](#conclusion)

# Introduction

Welcome to the Flash Card App, a versatile educational tool crafted with React. This comprehensive README offers a detailed exploration of the project's structure, features, and usage. This application stands as a robust platform designed for the creation, organization, and study of flash cards, ultimately enhancing the learning journey for users.

## Flash Card Management
- **Create Cards:**
  Users can effortlessly generate new flash cards containing a question, an answer, and a status.
- **Edit Cards:**
  Edit existing cards by editing the front question, back answer, and status.
- **Delete Cards:**
  Remove unwanted cards through a straightforward deletion process.

## Display and Interaction
- **Interactive Cards:**
  Click on a card to dynamically flip and reveal its back side.
- **Search Cards:**
  Utilize the search bar to locate specific cards based on text present on either side.
- **Filter and Sort:**
  Organize cards by status (e.g., "Learned", "Want to Learn," "Noted").
  Apply sorting options such as date added, statuses (From "Learned" to "Noted"), and alphabetical order of the questions.

## Bonus Features
- **Share Function:**
  Select multiple cards and share their details via email in JSON format.
  Facilitates collaboration and content sharing among users.

# Getting Started

To set up and run the Flash Card App on your local machine, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nqasanova/Flash-Card-App

2. **Navigate to the Project Directory:**
   ```bash
   cd flash-card-app

4. **Install Dependencies:**
   ```bash
   npm install

6. **Start the JSON Server:**
   ```bash
   json-server --watch db.json --port 3000

8. **Start the React App:**
   ```bash
   npm start

10. **Access the App:**
    ```bash
    Open your browser and go to http://localhost:3001 to experience the Flash Card App.


# Project Structure
The Flash Card App follows a well-organized project structure for maintainability:

```bash
flash-card-app
|-- public
|-- src
|   |-- assets
|   |-- components
|   |-- App.css
|   |-- App.js
|   |-- index.css
|   |-- index.js
|   |-- ...
|-- package.json
|-- package-lock.json
|-- db.json
|-- README.md
|-- ...
```

- **public:** Contains the HTML file and other assets.
- **src:** The main source code directory.
- **assets:** Style and image files.
- **components:** Reusable React components.
- **App.js:** Central component orchestrating the app's structure.

# Project Functionality

## Flash Card Management

### Creating Cards
1. **Click the "Create" button.**
2. Fill in the details, including front text, back answer, and status.

### Updating Cards
1. **Hover over a card and click "Edit."**
2. Modify the front text, back answer, or status.
3. Save the changes to update the card.

### Deleting Cards
1. **Click the "Delete" button on a card to remove it.**

## Display and Interaction

### Interactive Cards
- **Click on a card to flip and view the back side.**
- Interact with the card's buttons for actions like editing and deleting.

### Searching Cards
- **Use the search bar to find cards based on text content.**

### Filtering and Sorting
- **Filter cards by status using the dropdown menu.**
- Sort cards based on date added, statuses, and, alphabetical order of the questions.

## Bonus Features

### Share Function
1. **Select multiple cards by checking the checkboxes.**
2. **Click the "Share" button to share the selected cards via email in JSON format.**

# Conclusion

**The Flash Card App provides a comprehensive solution for educational purposes.** With a user-friendly interface, intuitive card management, and additional features like searching, filtering, and sharing, it offers an engaging learning experience. The modular component structure ensures code reusability and maintainability, making it a valuable tool for both learners and educators.

