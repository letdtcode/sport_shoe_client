import {
  Box,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line
  const [placement, setPlacement] = React.useState("left");

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  const navMenu = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "Shop",
      url: "/shop",
    },
    {
      id: 4,
      title: "Contact Us",
      url: "/contact",
    },
  ];

  return (
    <Box
      as="section"
      mt={{
        md: "4",
      }}
      mb={{ md: "4" }}
      bg="blackAlpha.200"
    >
      <Box as="nav" bg="bg-surface">
        <Container
          py={{
            base: "4",
            lg: "5",
          }}
          maxW="container.lg"
        >
          <HStack spacing="10" justify="end">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  {navMenu.map((item) => (
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "link-active" : "link-header"
                      }
                      exact
                      to={`${item.url}`}
                    >
                      <Text
                        fontSize="15px"
                        fontWeight="600"
                        textTransform="uppercase"
                      >
                        {item.title}
                      </Text>
                    </NavLink>
                  ))}
                </ButtonGroup>
              </Flex>
            ) : (
              <>
                <IconButton
                  variant="ghost"
                  icon={<FiMenu fontSize="1.25rem" />}
                  aria-label="Open Menu"
                  onClick={onOpen}
                />
                <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                      <Image src="/images/logo.png" w={200} h={50} />
                    </DrawerHeader>
                    <DrawerBody>
                      <VStack spacing="8">
                        {navMenu.map((item, index) => (
                          <Link to={`${item.url}`} key={index}>
                            <Text
                              fontSize="20px"
                              fontWeight="600"
                              textTransform="uppercase"
                            >
                              {item.title}
                            </Text>
                          </Link>
                        ))}
                      </VStack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
