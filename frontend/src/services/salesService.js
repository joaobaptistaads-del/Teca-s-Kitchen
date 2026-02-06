import api from './authService.js';

export const salesService = {
  getAllSales: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/sales?${params}`);
    return response.data;
  },

  getSaleById: async (id) => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  createSale: async (saleData) => {
    const response = await api.post('/sales', saleData);
    return response.data;
  },

  getSalesStats: async (period = 'today') => {
    const response = await api.get(`/sales/stats?period=${period}`);
    return response.data;
  },

  getTopProducts: async (limit = 5) => {
    const response = await api.get(`/sales/top-products?limit=${limit}`);
    return response.data;
  },
};
