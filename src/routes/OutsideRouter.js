import { Route } from "react-router-dom";

const OutsideRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(propsRoute) => {
        return (
          <>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};

export default OutsideRouter;
