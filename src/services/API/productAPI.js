import axios from "../axios";

export const getAllProducts = async (keyword = "") => {
  try {
    const response = await axios.get(`/products?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const getFilteredProducts = async (skip, limit, filters = []) => {
  try {
    const response = await axios.post(`/products/search`, {
      skip,
      limit,
      filters,
    });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const getProductDetails = async (id) => {
  try {
    
    const response = await axios.get(`/products/${id}`);
    return response.data.product;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const createProductReview = async (productId, review) => {
  try {
    const response = await axios.post(`/products/${productId}/review`, review);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const getProductsBySort = async (sortBy) => {
  try {
    const response = await axios.get(`/products?sortBy=${sortBy}&order=desc&limit=6`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};
