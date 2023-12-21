import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";
import URL from "../../URL";
// ADD PRODUCT TO CART

export const addToCart = (id, qty, typeSelect) => async (dispatch, getState) => {
  const { data } = await axios.get(`${URL}/api/v1/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.product,
      qty,
      typeSelect
    }

  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE PRODUCT FROM CART

export const removeFromCart = (id, typeSelect) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload:{
      id,
      typeSelect
    } 
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
