import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Wallet } from 'phosphor-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Name } from '~/components/name';
import { PrimaryButton } from '~/components/primary-button';
import { SwitchNetwork } from '~/components/switch-network';
import { useWeb3Auth } from '~/contexts/auth';
import { useBetterAuth } from '~/contexts/better-auth';

const Join = () => {
  const [showMetamaskOption, setShowMetamaskOption] = useState(false);
  const toast = useToast();
  const { replace } = useRouter();
  const { connect, isLoading, isConnected } = useBetterAuth();

  const handleConnectWallet = useCallback(async () => {
    if (isLoading) return;
    try {
      await connect();
      // const response = await client.current.send('eth_requestAccounts', []);
      // push('/home');
    } catch (err) {
      if (err.code !== undefined) {
        toast({
          status: 'error',
          title: `Couldn't connect to wallet`,
          description: err.message,
        });
      } else {
        console.log('err', err);
      }
    }
  }, [connect, isLoading, toast]);

  useEffect(() => {
    if (isConnected) {
      replace('/home');
    }
  }, [isConnected, replace]);

  return (
    <Center
      width="100vw"
      height="100vh"
      bgGradient="linear(to-r, blue.300, blue.500)"
    >
      <Head>Join BlockPe</Head>
      <SwitchNetwork floating />
      <Box padding="8" background="white" rounded="lg" shadow="lg">
        <Name />
        <Text mt="2" fontWeight="medium">
          Get started with crypto payments in minutes
        </Text>
        <PrimaryButton
          mt="4"
          onClick={handleConnectWallet}
          background="black"
          colorScheme="blackAlpha"
          rightIcon={<Wallet weight="bold" />}
          isLoading={isLoading}
        >
          Connect Wallet
        </PrimaryButton>

        {showMetamaskOption ? (
          <Box>
            <Text>
              Don&apos;t have a wallet? Install{' '}
              <Link
                href="http://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaMask
              </Link>
            </Text>
          </Box>
        ) : null}
      </Box>
    </Center>
  );
};

export default Join;
