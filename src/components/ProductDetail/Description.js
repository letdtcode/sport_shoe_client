import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BiPackage } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { Ri24HoursFill } from "react-icons/ri";
const Description = (props) => {
  const { product } = props;
  return (
    <Stack className="col-lg-12">
      <Accordion allowToggle defaultIndex={[1]} allowMultiple>
        <AccordionItem>
          <Heading as="h3" size="18px">
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Product Information
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>{product.description}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as="h3" size="18px">
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Shipping and return policy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <Stack bgColor="gray.50" p={4} borderRadius="5px">
              <VStack align="stretch">
                <Flex align="center" className="my-2">
                  <BiPackage fontSize="22px" className="mx-2" color="gray.50" />
                  <Text fontSize="18px" color="gray.600" fontWeight="200">
                    Free Shipping & Returns
                  </Text>
                </Flex>
                <Flex align="center" className="my-2">
                  <BsShieldCheck
                    fontSize="22px"
                    className="mx-2"
                    color="gray.50"
                  />
                  <Text fontSize="18px" color="gray.600" fontWeight="200">
                    Warranty 12 months
                  </Text>
                </Flex>
                <Flex align="center" className="my-2">
                  <Ri24HoursFill
                    fontSize="22px"
                    className="mx-2"
                    color="gray.50"
                  />
                  <Text fontSize="18px" color="gray.600" fontWeight="200">
                    Support 24/7
                  </Text>
                </Flex>
              </VStack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};

export default Description;
