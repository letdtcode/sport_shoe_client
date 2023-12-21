import { combineReducers } from "redux";
import {
  filterListReducer,
  productCreateReviewReducer,
  productDetailReducer,
  productListReducer,
} from "./ProductReducers";
import { cartReducer } from "./CartReducers";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateAvatarReducer,
  forgotPasswordReducer

} from "./UserReducers";
import {
  getOrderDetailReducer,
  myListOrderReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderPayReducer,
} from "./OrderReducers";
import { categoryListAllReducer } from "./CategoryReducer";
import { mailCreateReducer } from "./MailReducer";
import { brandListAllReducer } from "./BrandReducer";

const rootReducer = combineReducers({
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
  updateAvatar: userUpdateAvatarReducer,
  forgotPassword :forgotPasswordReducer,

  // MY ORDERS
  orderCreate: orderCreateReducer,
  orderDetails: getOrderDetailReducer,
  orderPay: orderPayReducer,
  myListOrder: myListOrderReducer,
  orderDelete: orderDeleteReducer,
  // CATEGORIES
  categoryList: categoryListAllReducer,
  //   BRANDS
  brandList: brandListAllReducer,
  // EMAIL
  sendEmail: mailCreateReducer,
});

export default rootReducer;
