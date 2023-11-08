import axios from "../../services/axios";
import URL from "../../URL";
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
} from "../constants/UserContants";
// USER LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // Using callback Auth headers config to identify json content


    // use axios.[POST] to compare user with server's user,
    const { data } = await axios.post(
      `${URL}/api/v1/users/login`,
      { email, password }

    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Update User Info with Server's User in localStorage
    localStorage.setItem("userInfo", JSON.stringify(data.data));
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
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
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
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
  // Redirect to /login
  document.location.href = "/login";
  fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
    withCredentials: true,
    credentials: "include",
  })
};

// REGISTER USER
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    // Using callback Auth headers config to identify json content
    

    // use axios.[POST] to compare user with server's user,
    const { data } = await axios.post(
      `${URL}/api/v1/users`,
      { name, email, password }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
 
    dispatch({ type: USER_DETAILS_REQUEST });

    // Using callback Auth headers config to identify json content
  
    const { data } = await axios.get(`${URL}/api/v1/users/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
    //  dispatch(logout());
    }
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


    // Using callback Auth headers config to identify json conten

    // use axios.[POST] to compare user with server's user,
    const { data } = await axios.get(
      `http://localhost:4000/users/${googleId}`
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      // dispatch(logout());
    }
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

    // Using callback Auth headers config to identify json content

    // use axios.[PUT] to update user with server's user,
    console.log(user)
    const { data } = await axios.put(
      `${URL}/api/v1/users/profile`,
      user
    );

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    // * UPDATE STATE AND REFRESH PAGE, payload : [...data]
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      // dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
