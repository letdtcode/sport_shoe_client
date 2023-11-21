import axios from "../../services/axios";
import { updateAvatarRequest, loginUserApi, registerApi, updateProfileRequest, forgotPasswordRequest } from "../../services/API/usersAPI";
import { ORDER_LIST_MY_RESET } from "../constants/OrderConstants";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  RESET_REGISTER_SUCCESS,
  USER_LOGIN_REFRESH,
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "../constants/UserContants";
// USER LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const dataLogin = await loginUserApi(email, password)
    if (dataLogin.status === 200) {
      localStorage.setItem("userInfo", JSON.stringify(dataLogin.data.userInfo));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(dataLogin.data.accessToken)
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(dataLogin.data.refreshToken)
      );
      dispatch({ type: USER_LOGIN_SUCCESS, payload: dataLogin.data.userInfo });
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error });
  }
};

export const loginOAuth2 = () => async (dispatch) => {
  await fetch(`http://localhost:4000/auth/login/success`, {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error("failed authorized");
    })
    .then((resObject) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: JSON.stringify(resObject.user),
      });
      localStorage.setItem("userInfo", JSON.stringify(resObject.user));
    })
    .catch((error) => {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    });
};
// LOGOUT
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

// REGISTER USER
export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  const dataRegister = await registerApi(name, email, password);
  if (dataRegister.status === 201) {
    dispatch({ type: USER_REGISTER_SUCCESS, payload: dataRegister.data });
    return;
  }
  dispatch({ type: USER_REGISTER_FAIL, payload: dataRegister.data.message });
};

// GET USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/users/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// GET USER AUTH DETAIL
export const getUserAuthDetail = (googleId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`http://localhost:4000/users/${googleId}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};
// UPDATE PROFILE
export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const data = await updateProfileRequest(user);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: USER_LOGIN_REFRESH });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
export const updateAvatar = (imageFile) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AVATAR_REQUEST });

    const response = await updateAvatarRequest(imageFile);

    dispatch({
      type: UPDATE_AVATAR_SUCCESS,
      payload: response.data,
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    userInfo.avatarUrl = response.data.avatarUrl;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    dispatch({ type: USER_LOGIN_REFRESH });
  } catch (error) {
    dispatch({
      type: UPDATE_AVATAR_FAIL,
      payload: error.message,
    });
  }
};

export const resetRegisterSuccess = () => ({
  type: RESET_REGISTER_SUCCESS,
});



export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({type: FORGOT_PASSWORD_REQUEST})
    const response = await forgotPasswordRequest(email)
   if (response.status=== 200){
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: response.data.message,
    })
   }
   else if (response.status=== 404)
   {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: response.data.message,
    });
   }
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};
