export const createProfileApi = (apiClient) => ({
    getMe: async () => {
        return await apiClient.get('/user/me');
    }
});