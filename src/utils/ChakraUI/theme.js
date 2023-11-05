import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Cabin, sans-serif",
  },
  styles: {
    global: {
      body: {
        // bg: "#f7fafa",
      },
    },
  },
});

export default theme;
