// Importing React, Components, Apps, CSS
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './components/App';

// Finding Element by ID in HTML and injecting code JS Code!
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Removes the useless console logs!
console.clear();