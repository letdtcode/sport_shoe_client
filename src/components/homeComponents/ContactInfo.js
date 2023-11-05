import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlEnvolopeLetter } from "react-icons/sl";
import { TfiPackage } from "react-icons/tfi";
export default function ContactInfo() {
  const headingInfo = [
    {
      id: 1,
      heading: "Free ship over $100",
      description:
        "Free shipping worldwide with many special offers for dear customers",
      icon: <CiDeliveryTruck size={80} />,
    },
    {
      id: 2,
      heading: "-10% sign up to receive email information",
      description:
        "Many customers trust us with their varius shoe needs, and customer satisfaction is our pride.",
      icon: <SlEnvolopeLetter size={50} />,
    },
    {
      id: 3,
      heading: "Free returns in store",
      description:
        "You can get a wide variety of shoes with the highest quality at an affordable price",
      icon: <TfiPackage size={50} />,
    },
  ];

  return (
    <Box as="section" py="14" px={{ base: "4", md: "8" }} mt={100}>
      <Flex align="center" justify="center">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "6", md: "12" }}>
          {headingInfo.map((item) => (
            <VStack gap="15px" border="2px dashed #333" borderRadius={10} p={5}>
              <Center className="info-image">{item.icon}</Center>
              <Heading
                as="h3"
                size={{ base: "sm", md: "md" }}
                textTransform="uppercase"
                textAlign="center"
                fontWeight="bold"
              >
                {item.heading}
              </Heading>
              <Text size="sm" textAlign="center">
                {item.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
