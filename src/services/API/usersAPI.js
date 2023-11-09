
import axios from "../axios";

export const updateAvatarRequest = async (imageFile) => {
  try {
    let formData = new FormData();
    formData.append("file", imageFile);
    const res = await axios.put("/users/avatar", formData);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const loginUserApi = async (email, password) => {
  try {
    const response = await axios.post(`/users/login`, { email, password });
    return response;
  } catch (error) {
    return error
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
    const { data } = await axios.put(`/users/profile`, user);
    return data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};