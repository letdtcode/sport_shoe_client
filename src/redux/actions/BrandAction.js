import axios from "axios";
import URL from "../../URL";
import {
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../constants/BrandConstants";

// [GET] GET ALL CATEGORIES LIST ACTION
export const brandListAllAction = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });

    const { data } = await axios.get(`${URL}/api/v1/brands`);
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BRAND_LIST_FAIL,
      payload: message,
    });
  }
};
