/**
 * Authentication API Endpoints
 * This file is shared between the web and mobile applications.
 */

export const createAuthApi = (apiClient) => ({
  // 1. Suggest Usernames
  suggestUsernames: async (fullName, email) => {
    return await apiClient.get(`/auth/suggest-usernames/${encodeURIComponent(fullName)}/${encodeURIComponent(email)}`);
  },

  // 2. Check Username Availability
  checkUsername: async (username) => {
    return await apiClient.get(`/auth/check-username/${encodeURIComponent(username)}`);
  },

  // 3. SignUp
  signUp: async (userData) => {
    return await apiClient.post('/auth/signup', userData);
  },

  // 4. LogIn
  login: async (email, password) => {
    return await apiClient.post('/auth/login', { identifier: email, password });
  },

  // 5. Verify OTP
  verifyEmail: async (email, code) => {
    return await apiClient.post('/auth/verify-email', { email, code });
  },

  // 6. Resend OTP
  resendOtp: async (email, purpose) => {
    return await apiClient.post('/auth/resend-otp', { email, purpose });
  },

  // 7. Forget Password
  forgetPassword: async (email) => {
    return await apiClient.post('/auth/forget-password', { email });
  },

  // 8. Reset Password
  resetPassword: async (email, code, newPassword) => {
    return await apiClient.post('/auth/reset-password', { email, code, newPassword });
  },

  // 9. Change Password (Initiate)
  changePassword: async (email) => {
    return await apiClient.post('/auth/change-password', { email });
  },

  // 10. LogOut
  logout: async (allDevices = false) => {
    const endpoint = allDevices ? '/auth/logout-all' : '/auth/logout';
    return await apiClient.post(endpoint, {});
  },

  // 11. Refresh Access Token
  refreshAccessToken: async (refreshToken) => {
    return await apiClient.post('/auth/refresh', { refreshToken });
  },

  // 12. Get Universities
  getUniversities: async () => {
    return await apiClient.get('/auth/universities');
  },

});
