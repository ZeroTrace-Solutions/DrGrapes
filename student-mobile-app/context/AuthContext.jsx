import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';
import { sharedApi } from '@/config/api';
import { normalizations } from '@shared/utils/normalization';

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
    academicLevel: null,
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
      const token = await SecureStore.getItemAsync('access_token');
      const userDataSerialized = await SecureStore.getItemAsync('user_data');

      if (token && userDataSerialized) {
        setUser(JSON.parse(userDataSerialized));
      }
    } catch (e) {
      console.error("Error loading auth data", e);
    } finally {
      setIsLoading(false);
    }
  }

  const setAuthSession = async (userData, accessToken, refreshToken) => {
    await SecureStore.setItemAsync('access_token', accessToken);
    if (refreshToken) await SecureStore.setItemAsync('refresh_token', refreshToken);
    await SecureStore.setItemAsync('user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuthSession = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('user_data');
    setUser(null);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data, error } = await sharedApi.auth.login(email, password);
      const payload = data?.data || data;

      if (payload?.accessToken && !error) {
        await setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
        return { data: payload, error: null };
      }
      return { data: null, error: error || 'Login failed' };
    } catch (e) {
      return { data: null, error: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    try {
      await sharedApi.auth.logout();
    } catch (e) {
      console.error("Logout API call failed", e);
    }
    await clearAuthSession();
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

  // Username Utilities
  const suggestUsernames = async (fullName, email) => {
    try {
      return await sharedApi.auth.suggestUsernames(fullName, email);
    } catch (error) {
      console.error("Failed to suggest usernames", error);
      return { data: null, error: error.message };
    }
  };

  const checkUsername = async (username) => {
    setIsLoading(true);
    try {
      return await sharedApi.auth.checkUsername(username);
    } finally {
      setIsLoading(false);
    }
  };

  const completeSignup = async (finalData = null) => {
    // normalize the signup data
    const normalizedData = normalizations.signupData(finalData || signupData);

    setIsLoading(true);
    try {
      const { data, error } = await sharedApi.auth.signUp(normalizedData);
      const payload = data?.data || data;

      if (!error && (data?.success || data?.statusCode === 201)) {
        if (payload?.accessToken) {
          await setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
        }
        return { data: payload, error: null };
      }
      return { data: null, error: error || payload?.message || 'Signup failed' };
    } catch (e) {
      console.error("Signup failed", e);
      return { data: null, error: e.message };
    } finally {
      setIsLoading(false);
    }
  }

  // 5. Verify OTP
  const verifyEmail = async (email, code) => {
    setIsLoading(true);
    try {
      const { data, error } = await sharedApi.auth.verifyEmail(email, code);
      const payload = data?.data || data;

      if (payload?.accessToken && !error) {
        if (payload.user) {
          await setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
        } else {
          await SecureStore.setItemAsync('access_token', payload.accessToken);
        }
        return { data: payload, error: null };
      }
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Resend OTP
  /*
  * @param {string} email - The email address of the user.
  * @param {string} purpose - The purpose of the OTP, one of {SIGNUP, FORGET_PASSWORD, CHANGE_PASSWORD}.
  * @returns {Promise} - The response from the API.
  */
  const resendOtp = async (email, purpose) => {
    setIsLoading(true);
    try {
      return await sharedApi.auth.resendOtp(email, purpose);
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Forget Password
  const forgetPassword = async (email) => {
    setIsLoading(true);
    try {
      return await sharedApi.auth.forgetPassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  // 8. Reset Password
  const resetPassword = async (email, code, newPassword) => {
    setIsLoading(true);
    try {
      return await sharedApi.auth.resetPassword(email, code, newPassword);
    } finally {
      setIsLoading(false);
    }
  };

  // 9. Change Password (Initiate)
  const changePassword = async (email) => {
    setIsLoading(true);
    try {
      return await sharedApi.auth.changePassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  // 11. Refresh Access Token
  const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('refresh_token');
    if (!refreshToken) return { error: 'No refresh token' };

    const { data, error } = await sharedApi.auth.refreshAccessToken(refreshToken);
    const payload = data?.data || data;

    if (payload?.accessToken && !error) {
      await SecureStore.setItemAsync('access_token', payload.accessToken);
      return { data: payload, error: null };
    }
    return { data: null, error };
  };

  // 12. Get Universities
  const getUniversities = async () => {
    const { data, error } = await sharedApi.auth.getUniversities();
    return { data, error };
  };

  // 13. Get Faculties
  const getFaculties = async () => {
    const { data, error } = await sharedApi.auth.getFaculties();
    return { data, error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      signupData,
      updateSignupData,
      resetSignupData,
      suggestUsernames,
      checkUsername,
      completeSignup,
      verifyEmail,
      resendOtp,
      forgetPassword,
      resetPassword,
      changePassword,
      refreshAccessToken,
      getUniversities,
      getFaculties
    }}>
      {children}
    </AuthContext.Provider>
  );
}
