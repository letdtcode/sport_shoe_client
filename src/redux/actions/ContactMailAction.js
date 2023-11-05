import axios from "axios";
import URL from "../../URL";
import {
  SEND_EMAIL_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
} from "../constants/MailConstants";

export const sendEmailAction =
  ({ name, email, subject, message }) =>
  async (dispatch) => {
    try {
      const getData = { name, email, subject, message };
      dispatch({ type: SEND_EMAIL_REQUEST });
      const { res } = await axios.post(`${URL}/api/v1/contact`, getData);

      dispatch({ type: SEND_EMAIL_SUCCESS, payload: res });
    } catch (error) {
      alert(error.response.data.message);
      dispatch({
        type: SEND_EMAIL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
