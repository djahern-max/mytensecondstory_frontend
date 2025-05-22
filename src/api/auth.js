import { api } from './index';

export const authAPI = {
  // OAuth Login Methods
  loginWithGoogle: async (credentials) => {
    try {
      const response = await api.post('/auth/google/callback', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Google login failed');
    }
  },

  loginWithGithub: async (credentials) => {
    try {
      const response = await api.post('/auth/github/callback', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'GitHub login failed');
    }
  },

  loginWithApple: async (credentials) => {
    try {
      const response = await api.post('/auth/apple/callback', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Apple login failed');
    }
  },

  // Get OAuth authorization URLs
  getGoogleAuthUrl: async () => {
    try {
      const response = await api.get('/auth/google/authorize');
      return response.data.authorization_url;
    } catch (error) {
      throw new Error('Failed to get Google auth URL');
    }
  },

  getGithubAuthUrl: async () => {
    try {
      const response = await api.get('/auth/github/authorize');
      return response.data.authorization_url;
    } catch (error) {
      throw new Error('Failed to get GitHub auth URL');
    }
  },

  // Token Management
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Token refresh failed');
    }
  },

  // User Management
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get user data');
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Don't throw error for logout as we want to clear local storage regardless
      console.warn('Logout API call failed:', error);
    }
  },

  // Registration (for future use)
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  },
};
