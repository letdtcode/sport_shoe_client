import { Heading, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <VStack className="justify-content-center">
      <Spinner />
      <Heading as="h4" size="md">
        Loading...
      </Heading>
    </VStack>
  );
}
