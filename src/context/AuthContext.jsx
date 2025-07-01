// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialToken = () =>
    localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  const [token, setToken] = useState(getInitialToken());
  const [user, setUser] = useState(null);

  const login = (newToken, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem('authToken', newToken);
    } else {
      sessionStorage.setItem('authToken', newToken);
    }
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
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
        logout(); // Clear token on failure
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
