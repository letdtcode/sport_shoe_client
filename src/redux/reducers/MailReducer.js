import {
  SEND_EMAIL_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_RESET,
  SEND_EMAIL_SUCCESS,
} from "../constants/MailConstants";

export const mailCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
      return {
        loading: true,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SEND_EMAIL_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case SEND_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};
