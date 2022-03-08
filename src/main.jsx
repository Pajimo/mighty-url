import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACorDVVHTp7bjJxw5MSZ9tN3iU4I1VhqY",
  authDomain: "mighty-url-shortner.firebaseapp.com",
  projectId: "mighty-url-shortner",
  storageBucket: "mighty-url-shortner.appspot.com",
  messagingSenderId: "1090035289159",
  appId: "1:1090035289159:web:f83180159019e380267562",
  measurementId: "G-DL67LYJFPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
