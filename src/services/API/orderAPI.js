import axios from "../axios";
export const createOrderApi = async (order) => {
    try {
      const { data } = await axios.post(`/orders`, order);
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
  export const getOrderApi = async (id) => {
    try {
      const { data } = await axios.get(`/orders/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
  export const payOrderApi = async (orderId, paymentResult) => {
    try {
      const { data } = await axios.put(`/orders/${orderId}/pay`, paymentResult);
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
  export const listMyOrderApi = async () => {
    try {
      const { data } = await axios.get(`/orders/`);
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
  export const deleteOrderApi = async (id) => {
    try {
      const { data } = await axios.delete(`/orders/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };