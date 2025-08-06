import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));
  //const navigate = useNavigate();

  const login = (userData, tokenData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    setUser(userData);
    setToken(tokenData);
  };

  const logout = (navigate) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/'); // Redirect to landing page after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
