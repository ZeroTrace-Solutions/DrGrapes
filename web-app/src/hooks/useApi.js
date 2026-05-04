import { useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useTranslation } from 'react-i18next';

export const useApi = () => {
  const { t } = useTranslation('landingPage');
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
        toast.success(successMessage || response.data.message || t('common.api.success', { defaultValue: 'Operation successful' }));
      }

      return { data: response.data, error: null };
    } catch (err) {
      const message = errorMessage || err.response?.data?.message || err.message || t('common.api.error', { defaultValue: 'Something went wrong' });
      
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
