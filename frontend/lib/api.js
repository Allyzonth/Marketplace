import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_TOKEN_KEY = 'marketplace_admin_token';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
});

// Get all products
export const fetchProducts = async () => {
  try {
    const response = await api.get('/api/products');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

const withAdminHeaders = () => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const adminLogin = async (username, password) => {
  const response = await api.post('/api/admin/login', { username, password });
  const token = response?.data?.data?.token;
  if (!token) throw new Error('Token admin tidak ditemukan');
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  }
  return token;
};

export const adminLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
};

export const isAdminLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(ADMIN_TOKEN_KEY));
};

// Create product (admin)
export const createProduct = async (payload) => {
  try {
    const response = await api.post('/api/products', payload, {
      headers: withAdminHeaders()
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product (admin)
export const updateProduct = async (id, payload) => {
  try {
    const response = await api.put(`/api/products/${id}`, payload, {
      headers: withAdminHeaders()
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (admin)
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/api/products/${id}`, {
      headers: withAdminHeaders()
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export default api;
