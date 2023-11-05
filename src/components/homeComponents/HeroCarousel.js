import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
const HeroCarousel = () => {
  return (
    <Container
      maxW={{ lg: "container.xl", md: "container.md", base: "container.sm" }}
      marginTop={5}
      className="hero-section bg-with-black carousel slide carousel-fade"
      id="carouselExampleFade"
      data-bs-ride="carousel"
    >
      <Box className="hero-title" w={[300, 400, 700]}>
        <Text
          fontWeight={100}
          fontSize={{ base: "18px", md: "20px", lg: "30px" }}
          className="mb-4"
        >
          Big Sale
        </Text>
        <Heading
          as="h3"
          size="2xl"
          fontSize={{ base: "30px", md: "40px", lg: "70px" }}
          fontWeight={200}
        >
          Summer Sale
        </Heading>
        <Heading
          as="h1"
          size="4xl"
          fontSize={{ base: "50px", md: "70px", lg: "90px" }}
          className="mt-4"
          textTransform="uppercase"
        >
          Air Jordan 1
        </Heading>
      </Box>
      <a className="hero-button" href="/shop">
        <Flex>
          <FiShoppingCart /> <Text marginLeft={2}>Shopping now</Text>
        </Flex>
      </a>
      <Box className="carousel-inner hero-banner-image">
        <HStack className="carousel-item active" maxW="700px">
          <Image src="/images/nike.png" className="d-block " alt="..." />
        </HStack>
      </Box>
    </Container>
  );
};

export default HeroCarousel;
