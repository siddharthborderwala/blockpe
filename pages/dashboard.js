import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { DashBoardName } from '~/components/name';

const DashboardLinks = [
  {
    _id: '001',
    name: 'Home',
    link: '/dashboard',
  },
  {
    _id: '002',
    name: 'Links',
    link: '/links',
  },
  {
    _id: '003',
    name: 'Activity',
    link: '/activity',
  },
];

const LinkBox = ({ children }) => {
  return (
    <Box marginTop="1rem" fontSize="1.2rem" paddingLeft="4rem">
      {children}
    </Box>
  );
};

const DashBoard = () => {
  return (
    <Flex>
      <Flex
        direction="column"
        bgGradient="linear(to-r, blue.300, blue.500)"
        width="20%"
        height="100vh"
      >
        <DashBoardName />

        {DashboardLinks.map(({ _id, name, link }) => (
          <LinkBox key={_id}>
            <Link href={link}>{name}</Link>
          </LinkBox>
        ))}
      </Flex>
      <Box>Home</Box>
    </Flex>
  );
};

export default DashBoard;
