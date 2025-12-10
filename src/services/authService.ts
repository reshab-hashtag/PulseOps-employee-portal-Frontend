import api from './api';

export const authService = {
    login: async (credentials: unknown) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    logout: async () => {
        // Implement logout logic if backend requires it
    }
};
