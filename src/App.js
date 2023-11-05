import React from "react";
import "./App.css";
import "./responsive.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import HomeScreen from "./views/HomeScreen";
import SingleProduct from "./views/SingleProduct";
import CartScreen from "./views/CartScreen";
import ShippingScreen from "./views/ShippingScreen";
import ProfileScreen from "./views/ProfileScreen";
import PaymentScreen from "./views/PaymentScreen";
import PrivateRouter from "./routes/PrivateRouter";
import { ChakraProvider } from "@chakra-ui/react";
// Chakra Font CSS
import CartItem from "./components/Cart/CartItem";
import "@fontsource/montserrat/500.css";
import "@fontsource/cabin/500.css";
import theme from "./utils/ChakraUI/theme";
import HomeRouter from "./routes/HomeRouter";
import ShopScreen from "./views/ShopScreen";
import PlaceOrder from "./components/PlaceOrder-UI/PlaceOrder.v1";
import OrderScreen from "./components/OrderScreen-UI/OrderScreen.v1";
import ContactScreen from "./views/ContactScreen";
import LoginMain from "./components/LoginScreen-UI/LoginMain-v1";
import SignUp from "./components/SignupScreen-UI/SignupMain-v1";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <HomeRouter path="/" component={HomeScreen} exact />
          <HomeRouter path="/shop/:category" component={ShopScreen} />
          <HomeRouter path="/shop" component={ShopScreen} />
          <HomeRouter path="/products/:id" component={SingleProduct} />
          <HomeRouter path="/login" component={LoginMain} />
          <HomeRouter path="/register" component={SignUp} />
          <HomeRouter path="/cart/:id?" component={CartScreen} />
          <PrivateRouter path="/profile" component={ProfileScreen} />
          <HomeRouter path="/contact" component={ContactScreen} />
          <PrivateRouter path="/shipping" component={ShippingScreen} />
          <PrivateRouter path="/payment" component={PaymentScreen} />
          <HomeRouter path="/cartitem" component={CartItem} />
          <PrivateRouter path="/dat-hang" component={PlaceOrder} />
          <PrivateRouter path="/order/:id" component={OrderScreen} />

          <HomeRouter path="*" component={ShopScreen} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
