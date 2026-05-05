import api from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { createSharedApi } from '@shared/api';
import { createApiClientAdapter } from '@shared/api/BaseClient';
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { apiMutate, loading: mutationLoading } = useApi();
  const navigate = useNavigate();

  // Initialize shared API modules using the shared adapter
  const sharedApi = createSharedApi(createApiClientAdapter(apiMutate));
  const silentApi = createSharedApi(createApiClientAdapter(apiMutate, { showSuccessToast: false }));

  // Check if user is logged in on mount
  useEffect(() => {
    const hydrateAuth = async () => {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        try {
          const { data, error } = await silentApi.profile.getMe();
          const payload = data?.data || data;

          if (payload && !error) {
            setUser(payload);
            navigate('/router');
          } else {
            clearAuthSession();
            navigate('/login');
          }
        } catch (e) {
          console.error('Failed to hydrate auth', e);
          clearAuthSession();
          navigate('/login');
        }
      }
      setAuthLoading(false);
    };

    hydrateAuth();
  }, []);

  const setAuthSession = (userData, accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    setUser(userData);
  };

  const clearAuthSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  // 1. Suggest Usernames
  const suggestUsernames = async (fullName, email) => {
    return await sharedApi.auth.suggestUsernames(fullName, email);
  };

  // 2. Check Username Availability
  const checkUsername = async (username) => {
    return await sharedApi.auth.checkUsername(username);
  };

  // 3. SignUp
  const signUp = async (userData) => {
    return await sharedApi.auth.signUp(userData);
  };

  // 4. LogIn
  const login = async (email, password) => {
    const { data, error } = await sharedApi.auth.login(email, password);
    const payload = data?.data || data;

    if (payload?.accessToken && !error) {
      setAuthSession(payload.user, payload.accessToken, payload.refreshToken);
      return { data: payload, error: null };
    }
    return { data: null, error: error || 'Login failed' };
  };

  // 5. Verify OTP
  const verifyEmail = async (email, code) => {
    const { data, error } = await sharedApi.auth.verifyEmail(email, code);
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
  /*
  * @param {string} email - The email address of the user.
  * @param {string} purpose - The purpose of the OTP, one of {SIGNUP, FORGET_PASSWORD, CHANGE_PASSWORD}.
  * @returns {Promise} - The response from the API.
  */
  const resendOtp = async (email, purpose) => {
    return await sharedApi.auth.resendOtp(email, purpose);
  };

  // 7. Forget Password
  const forgetPassword = async (email) => {
    return await sharedApi.auth.forgetPassword(email);
  };

  // 8. Reset Password
  const resetPassword = async (email, code, newPassword) => {
    return await sharedApi.auth.resetPassword(email, code, newPassword);
  };

  // 9. Change Password (Initiate)
  const changePassword = async (oldPassword, newPassword) => {
    return await sharedApi.auth.changePassword(oldPassword, newPassword);
  };

  // 10. LogOut
  const logout = async (allDevices = false) => {
    await silentApi.auth.logout(allDevices);
    clearAuthSession();
  };

  // 12. Refresh Access Token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return { error: 'No refresh token' };

    const { data, error } = await sharedApi.auth.refreshAccessToken(refreshToken);
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
    loading: authLoading,
    isMutating: mutationLoading,
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
