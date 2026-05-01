import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    fullName: '',
    dob: '',
    gender: '',
    username: '',
    profileImage: null,
    university: '',
    faculty: '',
    academicLevel: 1,
    method: 'email' // 'email' or 'google'
  });

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    loadStorageData();
  }, []);

  // Protection Logic: Redirect based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(login)' || segments[0] === 'signup';

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated and trying to access protected routes
      // router.replace('/(login)/login'); // Uncomment when ready for full protection
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth routes
      // router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  async function loadStorageData() {
    try {
      const authDataSerialized = await SecureStore.getItemAsync('auth_token');
      if (authDataSerialized) {
        // In a real app, verify the token here
        setUser({ token: authDataSerialized });
      }
    } catch (e) {
      console.error("Error loading auth data", e);
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockToken = "mock_token_123";
      await SecureStore.setItemAsync('auth_token', mockToken);
      setUser({ email, token: mockToken });
    } catch (e) {
      throw new Error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setUser(null);
    router.replace('/(login)/login');
  }

  const updateSignupData = (newData) => {
    setSignupData(prev => ({ ...prev, ...newData }));
  }

  const resetSignupData = () => {
    setSignupData({
      email: '',
      password: '',
      fullName: '',
      dob: '',
      gender: '',
      username: '',
      profileImage: null,
      university: '',
      faculty: '',
      academicLevel: 1,
      method: 'email'
    });
  }

  const completeSignup = async () => {
    setIsLoading(true);
    try {
      // Simulate Final API call with all collected data
      console.log("Completing signup with data:", signupData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockToken = "new_user_token_abc";
      await SecureStore.setItemAsync('auth_token', mockToken);
      setUser({ ...signupData, token: mockToken });
      
      return true;
    } catch (e) {
      console.error("Signup failed", e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      signupData, 
      updateSignupData, 
      resetSignupData,
      completeSignup 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
