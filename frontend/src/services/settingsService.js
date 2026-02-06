import api from './authService.js';

export const settingsService = {
  getAll: async () => {
    const response = await api.get('/settings');
    return response.data;
  },

  getByKey: async (key) => {
    const response = await api.get(`/settings/${key}`);
    return response.data;
  },

  update: async (key, value) => {
    const response = await api.put(`/settings/${key}`, { value });
    return response.data;
  },

  updateMultiple: async (settings) => {
    const response = await api.put('/settings/batch', settings);
    return response.data;
  },

  delete: async (key) => {
    const response = await api.delete(`/settings/${key}`);
    return response.data;
  }
};

export default settingsService;
