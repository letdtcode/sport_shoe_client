import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/UserAction";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
const Login = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  // eslint-disable-next-line

  const toast = useToast();
  // Executing side-effect in process of user login
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);

      toast({
        title: `Account verified successfully!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    // eslint-disable-next-line
  }, [userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Todo
    dispatch(login(email, password));
  };
  return (
    <>
      <Flex
        className="container d-flex flex-column justify-content-center align-items-center login-center"
        h="70vh"
      >
        {error && <Message variant={"alert-danger"}>{error}</Message>}
        {loading && <Loading></Loading>}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <Heading as="h4">LOGIN</Heading>
          <input
            type="email"
            placeholder="Địa chỉ email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-dark">
            LOGIN
          </button>
          <Text size="sm" fontSize="14px">
            Aren't a member ?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              {" "}
              Create an account
            </Link>
          </Text>
        </form>
      </Flex>
    </>
  );
};

export default Login;
