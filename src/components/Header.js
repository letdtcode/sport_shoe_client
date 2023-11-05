import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import MobileHeader from "./Layout/MobileHeader";
import DesktopHeader from "./Layout/DesktopHeader";
import { CiFacebook, CiInstagram, CiMail } from "react-icons/ci";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      {/* Top Header */}
      <Box
        w="100%"
        borderBottomWidth={4}
        borderRadius="2px"
        className="Announcement"
        borderColor="gray.300"
        bg="blackAlpha.300"
      >
        <Container maxW="container.xl" className="py-1">
          <Flex className="row" align="center" justify="between">
            <Flex align="center" className="col-md-3 display-none">
              <CiMail className="mx-2" />
              <a href="mailto:didan.mobe@gmail.com">
                <Text marginRight="2" fontSize="14px">
                  didan.mobe@gmail.com
                </Text>
              </a>
            </Flex>

            <Flex
              align="center"
              className="col-12 col-lg-9 justify-content-lg-end display-none"
            >
              <a href="https://www.facebook.com/ledidan">
                <CiFacebook fontSize="20px" />
              </a>
              <a href="https://instagram.com/blackdouble.d">
                <CiInstagram fontSize="20px" />
              </a>
            </Flex>
          </Flex>
        </Container>
      </Box>
      {/* Header */}
      <Flex className="header">
        <Container maxW="container.xl">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <MobileHeader
              cartItems={cartItems}
              userInfo={userInfo}
              keyword={keyword}
              dispatch={dispatch}
              setKeyword={setKeyword}
            />
          </div>

          {/* PC HEADER */}
          <Container
            className="navbar-expand-lg display-none"
            maxW="container.xl"
          >
            <DesktopHeader
              cartItems={cartItems}
              userInfo={userInfo}
              keyword={keyword}
              dispatch={dispatch}
              setKeyword={setKeyword}
            />
          </Container>
        </Container>
      </Flex>
    </div>
  );
};

export default Header;
