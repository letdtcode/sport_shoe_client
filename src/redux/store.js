import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  filterListReducer,
  productCreateReviewReducer,
  productDetailReducer,
  productListReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/UserReducers";
import {
  getOrderDetailReducer,
  myListOrderReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderPayReducer,
} from "./reducers/OrderReducers";
import { categoryListAllReducer } from "./reducers/CategoryReducer";
import { mailCreateReducer } from "./reducers/MailReducer";

const reducer = combineReducers({
  // PRODUCT
  productList: productListReducer,
  productDetails: productDetailReducer,
  productCreateReview: productCreateReviewReducer,
  productFilter: filterListReducer,
  // CART
  cart: cartReducer,
  // USERS
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdate: userUpdateProfileReducer,
  // MY ORDERS
  orderCreate: orderCreateReducer,
  orderDetails: getOrderDetailReducer,
  orderPay: orderPayReducer,
  myListOrder: myListOrderReducer,
  orderDelete: orderDeleteReducer,
  // CATEGORIES
  categoryList: categoryListAllReducer,
  // EMAIL
  sendEmail: mailCreateReducer,
});

// SAVE CartItem
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// SAVE USER Login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// SAVE SHIPPING ADDRESS
const shippingAddressLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
