import { Box, Button, Center, Heading, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { Wallet } from 'phosphor-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Name } from '~/components/name';
import { useClient } from '~/hooks/use-client';

const Join = () => {
  const [showMetamaskOption, setShowMetamaskOption] = useState(false);
  const client = useClient();
  const toast = useToast();

  const handleConnectWallet = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.current.send('eth_requestAccounts', []);
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
  }, [client, toast]);

  return (
    <Center
      width="100vw"
      height="100vh"
      bgGradient="linear(to-r, blue.300, blue.500)"
    >
      <Box padding="8" background="white" rounded="lg" shadow="lg">
        <Name />
        <Text mt="2" fontWeight="medium">
          Get started with crypto payments in minutes
        </Text>
        <Button
          mt="4"
          onClick={handleConnectWallet}
          background="black"
          colorScheme="blackAlpha"
          rightIcon={<Wallet weight="bold" />}
        >
          Connect Wallet
        </Button>

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
