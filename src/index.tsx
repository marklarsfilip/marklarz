import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAioncy3XhIyQ1MkQ4bKqcNixKhroivuNg",
  authDomain: "marklarz-101.firebaseapp.com",
  projectId: "marklarz-101",
  storageBucket: "marklarz-101.appspot.com",
  messagingSenderId: "851235299166",
  appId: "1:851235299166:web:7fce4354b099bc243a39cf",
  measurementId: "G-Q3JTSQLZSX"
};

/* eslint-disable-next-line */
const app = initializeApp(firebaseConfig);
/* eslint-disable-next-line */
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
