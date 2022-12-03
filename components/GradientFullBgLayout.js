import { Center } from '@chakra-ui/react';

export const GradientFullBgLayout = ({ children }) => {
  return (
    <Center
      width="100vw"
      height="100vh"
      bgGradient="linear(to-r, blue.300, blue.500)"
    >
      {children}
    </Center>
  );
};
