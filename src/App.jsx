// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
// import AuthContext from './contexts/AuthContext'; // We'll create this later

// Mock authentication check (replace with context/state management later)
const useAuth = () => {
  // In a real app, check token in localStorage or context
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  return { isAuthenticated, setIsAuthenticated };
};

// Component to protect routes
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />; // Renders the child route's element
};

function App() {
  // Simple auth state for demonstration - move to Context later
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogin = () => {
      // Mock login: Set token and update state
      localStorage.setItem('authToken', 'dummy-token');
      setIsAuthenticated(true);
  };

  const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
       // Navigate('/login') // Could add this using useNavigate hook
  };


  return (
    // Optional: Provide AuthContext here later
    <div className="App">
      {/* You might add a Navbar component here later */}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/orders" /> : <LoginPage onLoginSuccess={handleLogin} />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/orders" element={<OrdersPage onLogout={handleLogout} />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Redirect root path */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/orders" : "/login"} />} />

        {/* Optional: Add a 404 Not Found page */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;