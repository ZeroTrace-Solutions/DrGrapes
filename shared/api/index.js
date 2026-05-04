import { createAuthApi } from './auth';
import { createProfileApi } from './profile';

/**
 * Shared API Service Factory
 * @param {Object} apiClient - An instance of an API client (axios or fetch wrapper)
 * @returns {Object} All modules with their respective API calls
 */
export const createSharedApi = (apiClient) => {
  return {
    auth: createAuthApi(apiClient),
    profile: createProfileApi(apiClient),
  };
};
