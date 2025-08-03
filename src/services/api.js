import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.in/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout
})

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products')
      return response.data.products || response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.product || response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products?category=${category}`)
      return response.data.products || response.data
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw error
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories')
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }
}

export default api 