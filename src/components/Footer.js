import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <Container as="footer" maxW="container.xxl" mt={20}>
    <Stack
      spacing="8"
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-around"
      py={{
        base: "12",
        md: "16",
      }}
    >
      <Stack
        spacing={{
          base: "6",
          md: "8",
        }}
        align="start"
      >
        <Image
          w={180}
          h={70}
          src="https://res.cloudinary.com/dfaejacdn/image/upload/v1667615733/Dan-Logo/logo_x77sj3.png"
        />
      </Stack>
      <Stack
        direction={{
          base: "column-reverse",
          md: "column",
          lg: "row",
        }}
        spacing={{
          base: "12",
          md: "8",
        }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="md" fontWeight="semibold" color="black">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Link href="/about-us" color="black.700">
                Introduce
              </Link>
              <Link href="/shop" color="black.700">
                Shop
              </Link>
              <Link href="/feedback" color="black.700">
                Feedback
              </Link>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="md" fontWeight="semibold" color="black">
              Policy
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Link href="/privacy" color="black.700">
                Policy & Terms
              </Link>
              <Link href="/license" color="black.700">
                Copyright
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="black">
            Contact me
          </Text>
          <Stack
            spacing="4"
            direction={{
              base: "column",
              sm: "row",
            }}
            maxW={{
              lg: "360px",
            }}
          >
            <Input placeholder="Enter your email" type="email" required />
            <Button
              className="btn btn-outline-dark"
              color="black"
              type="submit"
              flexShrink={0}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider />
    <Stack
      pt="8"
      pb="12"
      justify="center"
      direction={{
        base: "column-reverse",
        md: "row",
      }}
      align="center"
    >
      <Text fontSize="sm" color="black">
        &copy; {new Date().getFullYear()} Di Dan, Inc. All rights reserved.
      </Text>
      <ButtonGroup variant="link">
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/ledidan/"
          aria-label="LinkedIn"
          color="black.800"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="https://www.github.com/ledidan"
          aria-label="GitHub"
          color="black.800"
          icon={<FaGithub fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="https://www.facebook.com/ledidan"
          aria-label="Facebook"
          color="black.800"
          icon={<FaFacebook fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  </Container>
);

export default Footer;
