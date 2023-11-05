import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/UserAction";
import Loading from "../../components/LoadingError/Loading";
import Toast from "../../components/LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Message from "../../components/LoadingError/Error";
const SignUp = ({ location, history }) => {
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
    <Container
      maxW="lg"
      mb={{
        base: "12",
        md: "20",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Toast />
      <Stack spacing="8">
        <Stack spacing="6">
          <Center>
            <Image src="/images/nikeLogo.png" w={70} h={70} />
          </Center>
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "xs",
                md: "xl",
              })}
              fontWeight="800"
            >
              SIGN UP
            </Heading>
            <HStack spacing="1" justify="center">
              <Text size="sm" fontSize="14px">
                Do you have an account ?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  <Button variant="link" colorScheme="blue">
                    LOGIN
                  </Button>
                </Link>
              </Text>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: "bg-surface",
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("lg", "xl-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <form onSubmit={submitRegisterHandler}>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              {/* <FormControl>
              <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
              <Input id="phoneNumber" type="number" />
            </FormControl> */}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <PasswordField
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Stack spacing="6" mt={6}>
              <Button colorScheme="red" type="submit">
                SIGN UP
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;
