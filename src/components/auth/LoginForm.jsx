// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css'; // Add basic styling

// Mock login function (replace with actual API call in services/authService.js)
const mockLoginApi = async (username, password) => {
    console.log("Attempting login with:", username, password);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock Validation
            if (username === 'test@example.com' && password === 'password') {
                resolve({ success: true, message: 'Login successful!', token: 'dummy-token' });
            } else {
                reject({ success: false, message: 'Invalid credentials' });
            }
        }, 1000); // Simulate network delay
    });
};


const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    // Basic frontend validation
    if (!email || !password) {
        setError('Email and password are required.');
        setLoading(false);
        return;
    }

    try {
      // Replace with: const response = await authService.login(email, password);
      const response = await mockLoginApi(email, password);
      console.log("Login response:", response);
      if (response.success) {
        // Call the function passed from App.jsx to update auth state
        onLoginSuccess(response.token); // Pass token if needed later
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
};

return (
  <form onSubmit={handleSubmit} className="login-form">
    {error && <p className="error-message">{error}</p>}
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
        />
    </div>
    <button type="submit" disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  </form>
  
);
};

export default LoginForm;