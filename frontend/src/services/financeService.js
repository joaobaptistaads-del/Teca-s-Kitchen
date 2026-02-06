import api from './authService.js';

export const financeService = {
  getAllExpenses: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/finance/expenses?${params}`);
    return response.data;
  },

  getExpenseById: async (id) => {
    const response = await api.get(`/finance/expenses/${id}`);
    return response.data;
  },

  createExpense: async (expenseData) => {
    const response = await api.post('/finance/expenses', expenseData);
    return response.data;
  },

  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/finance/expenses/${id}`, expenseData);
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await api.delete(`/finance/expenses/${id}`);
    return response.data;
  },

  getFinancialSummary: async (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const response = await api.get(`/finance/summary?${params}`);
    return response.data;
  },

  getExpenseCategories: async () => {
    const response = await api.get('/finance/expenses/categories');
    return response.data;
  },
};
