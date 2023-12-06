import {
  FILTER_LIST_FAIL,
  FILTER_LIST_REQUEST,
  FILTER_LIST_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/ProductConstants";
import * as productApi from "../../services/API/productAPI";
import { clear } from "i/lib/inflections";

// [GET] ALL PRODUCT
export const listProduct =
  (keyword = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const data = await productApi.getAllProducts(keyword);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
      dispatch({ type: FILTER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// [POST] GET FILTERED PRODUCTS LIST
export const getFilteredProducts =
  (skip, limit, filters = []) =>
  async (dispatch) => {
    console.log(filters);
    try {
      dispatch({ type: FILTER_LIST_REQUEST });
      const data = await productApi.getFilteredProducts(skip, limit, filters);
      dispatch({ type: FILTER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FILTER_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// [GET] SINGLE PRODUCT

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const data = await productApi.getProductDetails(id);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// [POST] PRODUCT REVIEW
export const productCreateReviewAction =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const data = await productApi.createProductReview(productId, review);

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const getProducts = (sortBy) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const data = await productApi.getProductsBySort(sortBy);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
