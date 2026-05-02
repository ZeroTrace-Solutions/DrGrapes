import { useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiMutate = async (url, method = 'GET', body = null, options = {}) => {
    const { 
      showSuccessToast = true, 
      showErrorToast = true,
      successMessage = null,
      errorMessage = null,
      headers = {}
    } = options;

    setLoading(true);
    setError(null);

    try {
      const response = await api({
        url,
        method: method.toUpperCase(),
        data: body,
        headers
      });
      
      if (showSuccessToast) {
        toast.success(successMessage || response.data.message || 'Operation successful');
      }

      return { data: response.data, error: null };
    } catch (err) {
      const message = errorMessage || err.response?.data?.message || err.message || 'Something went wrong';
      
      setError(message);
      
      if (showErrorToast) {
        toast.error(message);
      }

      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { apiMutate, loading, error };
};
