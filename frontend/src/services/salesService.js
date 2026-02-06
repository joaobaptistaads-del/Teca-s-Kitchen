import api from './authService.js';

export const salesService = {
  getAll: async (params = {}) => {
    const response = await api.get('/sales', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  create: async (saleData) => {
    const response = await api.post('/sales', saleData);
    return response.data;
  },

  getStats: async (period = 'today') => {
    const response = await api.get('/sales/stats', { params: { period } });
    return response.data;
  },

  getTopProducts: async (limit = 10) => {
    const response = await api.get('/sales/top-products', { params: { limit } });
    return response.data;
  }
};

export default salesService;
