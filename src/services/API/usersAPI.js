
import axios from "../axios";

import { toFormData } from "axios";

export const loginRequest = async (LoginRequest) => {
  try {
    const res = await axios.post("auth/signin", LoginRequest);
    return res;
  } catch (error) {
    return error.response;
  }
};
export const checkAccount = async (CheckAccount) => {
  try {
    const res = await axios.post("public/user/checkmail", CheckAccount);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const registerRequest = async (RegisterRequest) => {
  try {
    const res = await axios.post("auth/signup", RegisterRequest);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const tokenRefreshRequest = async (TokenRefreshRequest) => {
  try {
    const res = await axios.post("user/signin", TokenRefreshRequest);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const changePasswordRequest = async (data, token) => {
  try {
    const res = await axios.put("general/change-password", data);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateInfoRequest = async (data) => {
  try {
    const res = await axios.put("general/update-info", data, {
      params: { mail: data.mail },
    });
    console.log(data.mail);
    console.log(res);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateAvatarRequest = async (imageFile, mail) => {
  try {
    let formData = new FormData();
    formData.append("file", imageFile);
    const res = await axios.put("general/update_avatar", formData, {
      params: { mail: mail },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error.response;
  }
};
