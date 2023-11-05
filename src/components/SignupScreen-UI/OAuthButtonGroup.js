import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { FacebookIcon, GitHubIcon, GoogleIcon } from "./ProviderIcons";
const providers = [
  {
    name: "Google",
    icon: <GoogleIcon boxSize="5" />,
  },
  {
    name: "Facebook",
    icon: <FacebookIcon boxSize="5" />,
  },
  {
    name: "GitHub",
    icon: <GitHubIcon boxSize="5" />,
  },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
