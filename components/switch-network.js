import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { CaretDown } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { chains, useActiveNetwork } from '~/atoms/active-network';
import { useWeb3Auth } from '~/contexts/auth';

export const SwitchNetwork = ({ floating = false }) => {
  const [activeNetwork, setActiveNetwork] = useActiveNetwork();
  const { web3Provider } = useWeb3Auth();
  const toast = useToast();

  const handleNetworkChange = useCallback(
    async (chainId) => {
      try {
        await web3Provider?.send('wallet_switchEthereumChain', [{ chainId }]);
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
    [setActiveNetwork, toast, web3Provider]
  );

  return (
    <Box {...(floating ? { position: 'fixed', top: '4', right: '4' } : {})}>
      <Menu colorScheme="twitter">
        <MenuButton
          as={Button}
          colorScheme="whiteAlpha"
          border="1px"
          borderColor="gray.300"
          rightIcon={<CaretDown />}
          color="black"
          size="sm"
          disabled={!web3Provider}
        >
          {chains[activeNetwork].chainName}
        </MenuButton>
        <MenuList>
          {Object.entries(chains).map(([key, chain]) => (
            <MenuItem key={key} onClick={() => handleNetworkChange(key)}>
              {chain.chainName}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
