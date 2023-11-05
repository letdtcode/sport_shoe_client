import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ShopSection from "../components/homeComponents/ShopSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import HeroCarousel from "../components/homeComponents/HeroCarousel";
import ClientsLogo from "../components/LogoSlider/ClientsLogo";
import GenderCategory from "../components/homeComponents/genderCategory";
import CallToAction from "../components/homeComponents/CalltoActionSection";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../redux/constants/UserContants";
import axios from "axios";
const HomeScreen = () => {
  // window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/auth/login/success`;
      const { data } = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { user } = data;
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      });
      setUser(user);
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [getUser()]);

  console.log(user);
  return (
    <Flex direction="column" flex="1">
      <HeroCarousel />
      <ContactInfo />
      <ClientsLogo />
      <ShopSection />
      <GenderCategory />
      <CallToAction />
    </Flex>
  );
};

export default HomeScreen;
