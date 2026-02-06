import api from './authService.js';

export const settingsService = {
  getAllSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },

  getSettingByKey: async (key) => {
    const response = await api.get(`/settings/${key}`);
    return response.data;
  },

  updateSetting: async (key, value) => {
    const response = await api.post('/settings', { key, value });
    return response.data;
  },

  updateMultipleSettings: async (settings) => {
    const response = await api.put('/settings/bulk', settings);
    return response.data;
  },
};
