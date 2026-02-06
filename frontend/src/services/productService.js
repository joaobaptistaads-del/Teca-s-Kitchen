import api from './authService.js';

export const productService = {
  getAllProducts: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/products/categories', categoryData);
    return response.data;
  },
};
