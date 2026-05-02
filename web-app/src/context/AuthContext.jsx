import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useApi } from '@/hooks/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { apiMutate } = useApi();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setAuthLoading(false);
        return;
      }

      const { data, error } = await apiMutate(
        '/auth/me',
        'GET',
        { showSuccessToast: false, showErrorToast: false }
      );

      if (data && !error) {
        setAuthSession(data.user, token);
      } else {
        localStorage.removeItem('auth_token');
        setUser(null);
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, []);

  const setAuthSession = (userData, token) => {
    localStorage.setItem('auth_token', token);
    setUser(userData);
  };

  const login = async (email, password) => {
    const { data, error } = await apiMutate('/auth/login', 'POST', { identifier: email, password });
    if (data && !error) {
      setAuthSession(data.user, data.token);
      return { data, error: null };
    }
    return { data: null, error };
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const value = {
    user,
    loading: authLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
