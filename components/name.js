import { Box, Heading, Text } from '@chakra-ui/react';
import { Cube } from 'phosphor-react';
import React from 'react';

export const Name = ({ size }) => {
  const cubeFontSize = size === 'sm' ? '1.75rem' : '2.5rem';
  const headingFontSize = size === 'sm' ? '1.75rem' : '2rem';

  return (
    <Box display="flex" alignItems="center">
      <Cube weight="bold" fontSize={cubeFontSize} color="#63b3ed" />
      <Heading
        bgGradient="linear(to-r, blue.300, blue.500)"
        bgClip="text"
        ml="2"
        fontSize={headingFontSize}
      >
        BlockPe
      </Heading>
    </Box>
  );
};
