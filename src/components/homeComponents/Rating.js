import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Rating = ({ value, text }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass =
        value >= i
          ? "fas fa-star"
          : value >= i - 0.5
          ? "fas fa-star-half-alt"
          : "far fa-star";

      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };

  return (
    <Flex className="rating" align="center">
      {renderStars()}
      <Text fontSize="md" color="gray.600" fontWeight="100" marginLeft={2}>
        {text && text}
      </Text>
    </Flex>
  );
};

export default Rating;