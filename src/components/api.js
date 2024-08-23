import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // Adjust this according to your Django server's actual URL

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}products/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch a single product by ID
const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}products/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch products by category
const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}products/?category=${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new product (if needed)
const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}products/`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a product by ID (if needed)
const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}products/${id}/`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a product by ID (if needed)
const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}products/${id}/`);
    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
