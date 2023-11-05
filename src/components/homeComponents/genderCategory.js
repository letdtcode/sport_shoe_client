import React from "react";
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// Declare styled components
const CategoryBtn = styled.button`
  padding: 10px 5rem;
  border-radius: 5px;
  border: 1px solid #333;
  text-align: center;
  color: black;
  margin: 12px 0px !important;
  &:hover {
    background-color: #333;
    color: white;
  }
`;

const GenderCategory = () => {
  const renderCategories = {
    image1: `/images/air-jordan1.png`,
    title1: `nam`,
    image2: `/images/nike.png`,
    title2: `nu`,
    image3: `/images/air1.png`,
    title3: `treem`,
  };

  return (
    <Container maxW="max-content" mb={40}>
      <Center h={150}>
        <Heading as="h3" size="2xl" textTransform="uppercase">
          Sneaker Category
        </Heading>
      </Center>
      <Stack spacing="8">
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          templateRows={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          gap={4}
        >
          <GridItem colSpan={1}>
            <Box maxW="md" borderWidth="1px" className="BoxItem" rounded={10}>
              <VStack>
                <Center>
                  <Image src={renderCategories.image1} flex={1} flexBasis={1} />
                </Center>
                <Link to="/shop">
                  <CategoryBtn>
                    <Text letterSpacing={2} fontSize="18px">
                      Adidas
                    </Text>
                  </CategoryBtn>
                </Link>
              </VStack>
            </Box>
          </GridItem>
          <GridItem rowSpan={2} mt={20}>
            <Box maxW="md" borderWidth="1px" className="BoxItem" rounded={10}>
              <Center>
                <Image src={renderCategories.image2} flex={1} flexBasis={1} />
              </Center>
              <VStack>
                <Link to="/shop">
                  <CategoryBtn>
                    <Text letterSpacing={2} fontSize="18px">
                      Nike
                    </Text>
                  </CategoryBtn>
                </Link>
              </VStack>
            </Box>
          </GridItem>
          <GridItem rowSpan={1}>
            <Box maxW="md" borderWidth="1px" className="BoxItem" rounded={10}>
              <VStack>
                <Center>
                  <Image src={renderCategories.image3} flex={1} flexBasis={1} />
                </Center>
                <Link to="/shop">
                  <CategoryBtn>
                    <Text letterSpacing={2} fontSize="18px">
                      Puma
                    </Text>
                  </CategoryBtn>
                </Link>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
};

export default GenderCategory;
