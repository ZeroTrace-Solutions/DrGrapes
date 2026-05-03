import { createAuthApi } from './auth';

/**
 * Shared API Service Factory
 * @param {Object} apiClient - An instance of an API client (axios or fetch wrapper)
 * @returns {Object} All modules with their respective API calls
 */
export const createSharedApi = (apiClient) => {
  return {
    auth: createAuthApi(apiClient),
    // Add new modules here as the app grows
    // profile: createProfileApi(apiClient),
    // questions: createQuestionsApi(apiClient),
  };
};
