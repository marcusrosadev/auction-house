import { storage } from '../utils/storage/storage.js';
import { fetchWithHeaders } from '../api/header/header.js';
import { BASE_API_URL } from '../config/config.js';

const currentUser = (userData) => {
  storage.setItem('user', userData);
  storage.setItem('accessToken', userData.accessToken);
};

export const AuthServices = {
  register: async (userData) => {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auth/register`,
      'POST',
      userData,
    );
    currentUser(response.data);
    return response;
  },

  async login(credentials) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auth/login`,
      'POST',
      credentials,
    );
    currentUser(response.data);
    return response;
  },

  logout: () => {
    storage.clear();
  },

  getCurrentUser: () => {
    return storage.getItem('user');
  },

  getAccessToken: () => {
    return storage.getItem('accessToken');
  },

  isAuthenticated: () => {
    return !!AuthServices.getAccessToken();
  },

  async getLoggedProfile(name) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/profiles/${name}`,
      'GET',
    );
    return response;
  },

  async updateProfile(name, profileData) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/profiles/${name}`,
      'PUT',
      profileData,
    );
    return response.data;
  },
};
