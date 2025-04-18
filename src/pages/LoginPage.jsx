// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import './LoginPage.css'; // Add basic styling

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
    
  );
};

export default LoginPage;