import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { CaretDown, Circle } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { useActiveNetwork } from '~/atoms/active-network';
import { useWeb3Auth } from '~/contexts/auth';
import { useBetterAuth } from '~/contexts/better-auth';
import { chains } from '~/data';

export const SwitchNetwork = ({ floating = false }) => {
  const [activeNetwork, setActiveNetwork] = useActiveNetwork();
  const { provider } = useBetterAuth();
  const toast = useToast();

  const handleNetworkChange = useCallback(
    async (chainId) => {
      try {
        await provider?.send('wallet_switchEthereumChain', [
          { chainId: `${ethers.utils.hexValue(chainId)}` },
        ]);
        setActiveNetwork(chainId);
      } catch (err) {
        if (err.code) {
          toast({
            status: 'error',
            title: `Couldn't switch network`,
            description: err.message,
          });
        }
      }
    },
    [setActiveNetwork, toast, provider]
  );

  const activeChain = chains.find(({ id }) => id === activeNetwork);

  return (
    <Box
      {...(floating
        ? { position: 'fixed', top: '4', right: '4' }
        : { width: 'full' })}
    >
      <Menu colorScheme="twitter">
        <MenuButton
          as={Button}
          colorScheme="whiteAlpha"
          border="1px"
          borderColor="gray.300"
          rightIcon={<CaretDown />}
          color="black"
          size="sm"
          w="full"
          disabled={!provider}
        >
          <Text ml="2">{activeChain.name}</Text>
        </MenuButton>
        <MenuList>
          {chains.map((chain) => (
            <MenuItem
              key={chain.id}
              onClick={() => handleNetworkChange(chain.id)}
            >
              {chain.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
