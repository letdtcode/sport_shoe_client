
import axios from "../axios";

export const updateAvatarRequest = async (imageFile) => {
  try {
    let formData = new FormData();
    formData.append("file", imageFile);
    const res = await axios.put("/users/avatar", formData);
    return res;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const loginUserApi = async (email, password) => {
  try {
    const response = await axios.post(`/users/login`, { email, password });
    return response;
  } catch (error) {
    
    throw error.response ? error.response.data.message : error.message;
  }
};
export const registerApi = async (name, email, password) => {
  try {
    const response = await axios.post(`users`, { name, email, password });
    return response;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const updateProfileRequest = async (user) => {
  try {
    console.log(user)
    const { data } = await axios.put(`/users/profile`, user);
    return data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const forgotPasswordRequest = async (email) => {
  try {
    const data = await axios.post(`/users/forgot_password`, {email:email});
    return data;
  } catch (error) {
    throw error 
  }
};