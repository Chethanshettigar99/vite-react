import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
// The initial value is null because when the app loads, we don't know the auth state yet.
const AuthContext = createContext(null);

// 2. Create the Provider Componen
// This component will wrap parts of your app that need access to the auth state.
// It manages the auth state (token, isAuthenticated) and provides functions to update it.
export const AuthProvider = ({ children }) => {
  // State to hold the authentication token. Initialize from localStorage.
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));

  // State to easily check if the user is authenticated. Derived from authToken.
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  // Use an effect to synchronize localStorage and the isAuthenticated state whenever authToken changes.
  useEffect(() => {
    if (authToken) {
      // If there's a token, store it in localStorage and set authenticated to true.
      localStorage.setItem('authToken', authToken);
      setIsAuthenticated(true);
    } else {
      // If there's no token (logout), remove it from localStorage and set authenticated to false.
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    }
  }, [authToken]); // This effect runs whenever the authToken state changes.

  // Function to update the authToken state upon successful login
  const login = (token) => {
    setAuthToken(token);
  };

  // Function to clear the authToken state upon logout
  const logout = () => {
    setAuthToken(null);
  };

  // The value provided to consuming components includes the authentication status
  // and the login/logout functions.
  const contextValue = {
    isAuthenticated,
    login,
    logout,
    // You could also provide the authToken itself if needed elsewhere:
    // authToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children} {/* Render the children components wrapped by this provider */}
    </AuthContext.Provider>
  );
};

// 3. Create a Custom Hook for easy consumption
// This hook simplifies accessing the auth context value in components.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Optional: Throw an error if useAuth is used outside of an AuthProvider.
    // This helps catch bugs early.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Default export can be the context itself if needed, but usually provider/hook are enough.
// export default AuthContext;