import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// const script = document.createElement('script');
// script.src = "http://localhost:8097";

// document.head.appendChild(script);
root.render(
    <App />
);