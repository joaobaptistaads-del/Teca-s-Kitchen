import api from './authService.js';

export const financeService = {
  // Expenses
  getExpenses: async (params = {}) => {
    const response = await api.get('/finance/expenses', { params });
    return response.data;
  },

  getExpense: async (id) => {
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

  getExpenseCategories: async () => {
    const response = await api.get('/finance/expenses/categories');
    return response.data;
  },

  // Financial Summary
  getSummary: async (period = 'month') => {
    const response = await api.get('/finance/summary', { params: { period } });
    return response.data;
  }
};

export default financeService;
