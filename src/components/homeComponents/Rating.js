import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const rating = ({ value, text }) => {
  return (
    <Flex className="rating" align="center">
      <i
        className={
          value >= 1
            ? "fas fa-star"
            : value >= 0.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></i>
      <i
        className={
          value >= 2
            ? "fas fa-star"
            : value >= 1.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></i>
      <i
        className={
          value >= 3
            ? "fas fa-star"
            : value >= 2.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></i>
      <i
        className={
          value >= 4
            ? "fas fa-star"
            : value >= 3.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></i>
      <i
        className={
          value >= 5
            ? "fas fa-star"
            : value >= 4.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></i>
      <Text fontSize="md" color="gray.600" fontWeight="100" marginLeft={2}>
        {text && text}
      </Text>
    </Flex>
  );
};

export default rating;
