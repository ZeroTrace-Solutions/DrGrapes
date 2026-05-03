import axios from 'axios';

import { createSharedApi } from '@shared/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to ensure shared API calls return { data, error } consistent with the rest of the app
const sharedClientWrapper = {
  get: (url, config) => api.get(url, config).then(res => ({ data: res.data, error: null })).catch(err => ({ data: null, error: err.response?.data?.message || err.message })),
  post: (url, data, config) => api.post(url, data, config).then(res => ({ data: res.data, error: null })).catch(err => ({ data: null, error: err.response?.data?.message || err.message })),
  put: (url, data, config) => api.put(url, data, config).then(res => ({ data: res.data, error: null })).catch(err => ({ data: null, error: err.response?.data?.message || err.message })),
  delete: (url, config) => api.delete(url, config).then(res => ({ data: res.data, error: null })).catch(err => ({ data: null, error: err.response?.data?.message || err.message })),
};

export const sharedApi = createSharedApi(sharedClientWrapper);
export default api;
