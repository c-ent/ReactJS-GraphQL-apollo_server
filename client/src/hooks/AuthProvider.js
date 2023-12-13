import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for a stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    const initializeUser = () => {
      try {
        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Set the authentication state to true if both token and user data are found
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Handle errors, if any (e.g., JSON parsing error)
        console.error('Error initializing user:', error.message);
      }
    };

    // Call the function to initialize user data
    initializeUser();
  }, []); // Dependencies can be added if needed

  const handleLogin = ({ token, user }) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(JSON.parse(localStorage.getItem('user')));
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
