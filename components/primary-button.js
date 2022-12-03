import { Button } from '@chakra-ui/button';
import React from 'react';

export const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      backgroundColor="black"
      _hover={{ background: 'gray.800 ' }}
      _active={{ background: 'gray.800 ' }}
    >
      {children}
    </Button>
  );
};
