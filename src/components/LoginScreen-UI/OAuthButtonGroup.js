import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";

import { GitHubIcon, GoogleIcon, FacebookIcon } from "./ProviderIcons";

export const OAuthButtonGroup = () => {
  const providers = [
    {
      name: "Google",
      icon: <GoogleIcon boxSize="5" />,
      authButton: async () => {
        window.open(`https://sport-shoe-server.vercel.app/auth/google`, "_self");
      },
    },
    {
      name: "Facebook",
      icon: <FacebookIcon boxSize="5" />,
      authButton: async () => {
        window.open(
          `https://sport-shoe-server.vercel.app/auth/facebook`,
          "_self"
        );
      },
    },
    {
      name: "GitHub",
      icon: <GitHubIcon boxSize="5" />,
      authButton: async () => {
        window.open(`https://sport-shoe-server.vercel.app/auth/github`, "_self");
      },
    },
  ];

  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon, authButton }) => (
        <Button key={name} width="full" onClick={authButton}>
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
};
