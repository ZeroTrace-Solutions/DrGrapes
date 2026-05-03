import * as SecureStore from 'expo-secure-store';
import { createSharedApi } from '@shared/api';
import Constants from 'expo-constants';

// For mobile, we use fetch or axios. Let's use a simple fetch-based client consistent with BaseClient if we want to avoid adding axios dependency, 
// or just use axios if it's preferred. Since I can't easily run npm install, I'll provide a robust fetch-based one.

const BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://YOUR_API_URL'; // Replace with actual default or env

const apiClient = {
  request: async (url, method = 'GET', body = null, options = {}) => {
    const token = await SecureStore.getItemAsync('access_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: data.message || `Error ${response.status}` };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

  get: (url, options) => apiClient.request(url, 'GET', null, options),
  post: (url, body, options) => apiClient.request(url, 'POST', body, options),
  put: (url, body, options) => apiClient.request(url, 'PUT', body, options),
  delete: (url, options) => apiClient.request(url, 'DELETE', null, options),
};

export const sharedApi = createSharedApi(apiClient);
export default apiClient;
