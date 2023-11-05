import { Text } from "@chakra-ui/react";
import React from "react";

const InlineError = ({ error }) => {
  return (
    <Text className="my-1 fs-7" color="red.500">
      {error}
    </Text>
  );
};

export default InlineError;
