import { Box, Heading, Text } from '@chakra-ui/react';
import { Cube } from 'phosphor-react';
import React from 'react';

export const Name = () => {
  return (
    <Box display="flex" alignItems="center">
      <Cube weight="bold" fontSize="2.5rem" color="#63b3ed" />
      <Heading
        bgGradient="linear(to-r, blue.300, blue.500)"
        bgClip="text"
        ml="2"
      >
        BlockPe
      </Heading>
    </Box>
  );
};
