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
    const hydrateAuth = () => {
      const accessToken = localStorage.getItem('access_token');
      const savedUser = localStorage.getItem('user_data');
      
      if (accessToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Failed to parse user data', e);
          clearAuthSession();
        }
      }
      setAuthLoading(false);
    };

    hydrateAuth();
  }, []);

  const setAuthSession = (userData, accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuthSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const login = async (email, password) => {
    const { data, error } = await apiMutate('/auth/login', 'POST', { identifier: email, password });
    
    // Structure based on USER_REQUEST: data.data.user, data.data.accessToken, etc.
    // Note: useApi usually returns the response body directly in 'data'
    const payload = data?.data || data;

    if (payload?.accessToken && !error) {
      setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
      return { data: payload, error: null };
    }
    return { data: null, error: error || 'Login failed' };
  };

  const logout = () => {
    clearAuthSession();
  };

  const value = {
    user,
    role: user?.role || null,
    loading: authLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isSupplier: user?.role?.startsWith('SUPPLIER'),
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
