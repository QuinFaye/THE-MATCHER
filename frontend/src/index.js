import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';  // ✅ import the context provider


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>      {/* ✅ wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Optional: measure performance
reportWebVitals();
