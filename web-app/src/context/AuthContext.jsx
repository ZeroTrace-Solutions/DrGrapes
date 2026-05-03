import api from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { createAuthApi } from '@shared/api/auth';
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { apiMutate, loading: mutationLoading } = useApi();

  // Initialize shared auth API with the mutation helper to keep toasts/loading
  const authApi = createAuthApi({
    get: (url, options) => apiMutate(url, 'GET', null, options),
    post: (url, body, options) => apiMutate(url, 'POST', body, options),
    put: (url, body, options) => apiMutate(url, 'PUT', body, options),
    delete: (url, options) => apiMutate(url, 'DELETE', null, options),
  });

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

  // 1. Suggest Usernames
  const suggestUsernames = async (fullName, email) => {
    return await authApi.suggestUsernames(fullName, email);
  };

  // 2. Check Username Availability
  const checkUsername = async (username) => {
    return await authApi.checkUsername(username);
  };

  // 3. SignUp
  const signUp = async (userData) => {
    return await authApi.signUp(userData);
  };

  // 4. LogIn
  const login = async (email, password) => {
    const { data, error } = await authApi.login(email, password);
    const payload = data?.data || data;

    if (payload?.accessToken && !error) {
      setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
      return { data: payload, error: null };
    }
    return { data: null, error: error || 'Login failed' };
  };

  // 5. Verify OTP
  const verifyEmail = async (email, code) => {
    const { data, error } = await authApi.verifyEmail(email, code);
    const payload = data?.data || data;

    if (payload?.accessToken && !error) {
      if (payload.user) {
        setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
      } else {
        localStorage.setItem('access_token', payload.accessToken);
      }
      return { data: payload, error: null };
    }
    return { data: null, error };
  };

  // 6. Resend OTP
  const resendOtp = async (email, purpose) => {
    return await authApi.resendOtp(email, purpose);
  };

  // 7. Forget Password
  const forgetPassword = async (email) => {
    return await authApi.forgetPassword(email);
  };

  // 8. Reset Password
  const resetPassword = async (email, code, newPassword) => {
    return await authApi.resetPassword(email, code, newPassword);
  };

  // 9. Change Password (Initiate)
  const changePassword = async (email) => {
    return await authApi.changePassword(email);
  };

  // 10. LogOut
  const logout = async (allDevices = false) => {
    await authApi.logout(allDevices, { showSuccessToast: false });
    clearAuthSession();
  };

  // 12. Refresh Access Token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return { error: 'No refresh token' };

    const { data, error } = await authApi.refreshAccessToken(refreshToken);
    const payload = data?.data || data;

    if (payload?.accessToken && !error) {
      localStorage.setItem('access_token', payload.accessToken);
      return { data: payload, error: null };
    }
    return { data: null, error };
  };

  const value = {
    user,
    role: user?.role || null,
    loading: authLoading || mutationLoading,
    login,
    logout,
    signUp,
    verifyEmail,
    resendOtp,
    forgetPassword,
    resetPassword,
    changePassword,
    suggestUsernames,
    checkUsername,
    refreshAccessToken,
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
