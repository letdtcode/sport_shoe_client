import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/UserAction";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Message from "../components/LoadingError/Error";
import { Flex, Heading, Text } from "@chakra-ui/react";
const Register = ({ location, history }) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 4000, // means 2s
  };
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const toastId = React.useRef(null);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitRegisterHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Registered successful", ToastObjects);
    }
  };
  return (
    <>
      <Toast />
      <Flex
        className="container d-flex flex-column justify-content-center align-items-center login-center"
        h="70vh"
      >
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitRegisterHandler}
        >
          <Heading as="h4">SIGN UP</Heading>
          <input
            type="text"
            placeholder="enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign up</button>

          <Text size="sm" fontSize="14px">
            Do you have an account ?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Text>
        </form>
      </Flex>
    </>
  );
};

export default Register;
