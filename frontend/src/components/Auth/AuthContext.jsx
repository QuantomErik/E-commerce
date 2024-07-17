/* import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; */

/* import { jwtDecode } from "jwt-decode"; */



import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserDetails = async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}/`);
      setUser(response.data);
      console.log('Fetched user details:', response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated(true);
        const decodedUser = jwtDecode(res.data.access);
        await fetchUserDetails(decodedUser.user_id);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        if (token.split('.').length !== 3) {
          throw new Error('Invalid token format');
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          refreshToken();
        } else {
          setIsAuthenticated(true);
          fetchUserDetails(decoded.user_id);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, [refreshToken]);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setIsAuthenticated(true);
    const decodedUser = jwtDecode(accessToken);
    fetchUserDetails(decodedUser.user_id);
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};







