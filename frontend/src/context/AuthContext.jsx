// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
    if (storedUser) {
      setUser(storedUser); // Set user if found
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
    setUser(userData); // Set user in state
  };

  const logout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Clear user from state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
