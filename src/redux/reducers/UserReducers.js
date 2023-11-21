import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  RESET_REGISTER_SUCCESS,
  USER_LOGIN_REFRESH,
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "../constants/UserContants";

const stateDefault = {
  user: {},
  userInfo: [],
  message : "",
};

// USER LOGIN
export const userLoginReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};

    case USER_LOGIN_REFRESH:
      return {
        loading: false,
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      };
    default:
      return state;
  }
};

// USER REGISTER UPDATE
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: "Registered successful",
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        message: action.payload,
      };
    case RESET_REGISTER_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

// GET USER DETAIL
export const userDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        user: {},
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        user: {},
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DETAILS_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateAvatarReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case UPDATE_AVATAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {

    case FORGOT_PASSWORD_REQUEST:
    
      return {
        ...state,
        loading: true,
        message: action.payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
   
      return {
        ...state,
        loading: false,
        status: "success",
        message: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        status: "error",
        message: action.payload,
      };
    default:
      return state;
  }
};

