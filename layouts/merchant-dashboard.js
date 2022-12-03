import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Activity,
  ChartLineUp,
  Gear,
  HouseSimple,
  LinkSimple,
} from 'phosphor-react';
import { DashBoardName, Name } from '~/components/name';
import { SwitchNetwork } from '~/components/switch-network';

const dashboardLinks = [
  {
    name: 'Overview',
    href: '/home',
    icon: <HouseSimple weight="bold" />,
  },
  {
    name: 'Payment Links',
    href: '/home/links',
    icon: <LinkSimple weight="bold" />,
  },
  {
    name: 'Activity',
    href: '/home/activity',
    icon: <ChartLineUp weight="bold" />,
  },
  {
    name: 'Settings',
    href: '/home/settings',
    icon: <Gear weight="bold" />,
  },
];

const activeProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropBlur: 'blur(2px)',
  shadow: 'sm',
};

const NavLink = ({ href, children, icon, isActive }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      color="white"
      as={Link}
      href={href}
      w="full"
      py="2"
      px="4"
      rounded="lg"
      transition="all 0.2s linear"
      _hover={activeProperties}
      _active={activeProperties}
      {...(isActive ? activeProperties : {})}
    >
      {icon}
      <Text ml="4">{children}</Text>
    </Box>
  );
};

export const MerchantDashboard = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <Box display="grid" gridTemplateColumns="15rem 1fr">
      <Flex
        px="2"
        py="4"
        direction="column"
        bgGradient="linear(to-r, blue.300, blue.500)"
        height="100vh"
        alignItems="center"
      >
        <Box background="white" rounded="md" shadow="md" px="4" py="2">
          <Name />
        </Box>
        <Box py="4" px="2" mt="8" w="full" experimental_spaceY="2">
          {dashboardLinks.map(({ name, href, icon }) => (
            <NavLink
              key={href}
              href={href}
              icon={icon}
              isActive={pathname === href}
            >
              {name}
            </NavLink>
          ))}
        </Box>
        <Box mt="auto" w="full" px="4">
          <SwitchNetwork />
        </Box>
      </Flex>
      <Box pt="4" px="6" height="100vh" width="full">
        {children}
      </Box>
    </Box>
  );
};
