import React from "react";
import { Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Layout/Navbar";

const HomeRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Navbar />
            <Component {...propsRoute} />
            <Footer />
          </>
        );
      }}
    />
  );
};

export default HomeRouter;
