import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Pay Me Page
// Pre Configured Payment Links

export default function Home() {
  return (
    <div>
      <Head>
        <title>BlockPe</title>
      </Head>
      <div>
        <div>
          <Box
            background="url(/eth-hero.jpg)"
            height="100vh"
            width="100vw"
            backgroundSize="cover"
            backgroundPosition="center"
            padding="12"
          >
            <Heading color="white" fontSize="4rem">
              BlockPe
            </Heading>
            <Text mt="4" color="white" fontSize="1.5rem">
              Start accepting crypto payments in your business with a QR code
            </Text>
            <Button mt="8" as={Link} href="join">
              Sign Up
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
