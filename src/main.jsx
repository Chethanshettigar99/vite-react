    // src/main.jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from './App.jsx';
    import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
    import './assets/styles/App.css';   
    
      ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> 1 
    <AuthProvider> {/* Wrap App with AuthProvider */}
    <App />
    </AuthProvider> 2 
    </BrowserRouter>
    </React.StrictMode>
    );