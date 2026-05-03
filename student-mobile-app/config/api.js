import * as SecureStore from 'expo-secure-store';
import { createSharedApi } from '@shared/api';
import Constants from 'expo-constants';

// For mobile, we use fetch or axios. Let's use a simple fetch-based client consistent with BaseClient if we want to avoid adding axios dependency, 
// or just use axios if it's preferred. Since I can't easily run npm install, I'll provide a robust fetch-based one.

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

const apiClient = {
  request: async (url, method = 'GET', body = null, options = {}) => {
    const token = await SecureStore.getItemAsync('access_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const fullUrl = `${BASE_URL}${url}`;
    console.log(`[API Request] ${method} ${fullUrl}`);
    if (body) console.log(`[API Body]`, JSON.stringify(body, null, 2));

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.warn(`[API Non-JSON Response] ${response.status}:`, text.substring(0, 200));
        data = { message: `Server error (${response.status})` };
      }

      if (!response.ok) {
        console.error(`[API Error Response] Status ${response.status}:`, data);
        return { data: null, error: data.message || `Error ${response.status}` };
      }

      console.log(`[API Success] ${fullUrl}:`, data);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`[API Network Error] ${method} ${fullUrl}:`, errorMessage);
      
      let friendlyError = `Network error. Please check your internet connection.`;
      if (errorMessage.includes('Network request failed')) {
        friendlyError = `Cannot connect to the server. If you are on a physical device, ensure it can reach ${BASE_URL}`;
      }
      
      return { data: null, error: friendlyError };
    }
  },

  get: (url, options) => apiClient.request(url, 'GET', null, options),
  post: (url, body, options) => apiClient.request(url, 'POST', body, options),
  put: (url, body, options) => apiClient.request(url, 'PUT', body, options),
  delete: (url, options) => apiClient.request(url, 'DELETE', null, options),
};

export const sharedApi = createSharedApi(apiClient);
export default apiClient;
