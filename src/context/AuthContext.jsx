// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await api.get('/profile');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        logout(); // Optionally log out on error
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
