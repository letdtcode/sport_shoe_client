import { Container } from "@chakra-ui/react";
import React from "react";

export const SliderItem = ({ children, width, height }) => {
  return (
    <Container
      maxW="7xl"
      className="d-inline-flex justify-content-center align-items-center"
      width={width}
      height={height}
    >
      {children}
    </Container>
  );
};

export default SliderItem;
