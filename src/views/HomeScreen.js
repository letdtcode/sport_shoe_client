
import { Flex } from "@chakra-ui/react";
import ShopSection from "../components/homeComponents/ShopSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import HeroCarousel from "../components/homeComponents/HeroCarousel";
import ClientsLogo from "../components/LogoSlider/ClientsLogo";
import GenderCategory from "../components/homeComponents/genderCategory";
import CallToAction from "../components/homeComponents/CalltoActionSection";

const HomeScreen = () => {
  // window.scrollTo(0, 0);

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
