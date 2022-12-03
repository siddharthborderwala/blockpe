import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  Image,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Select,
} from '@chakra-ui/react';
import { UploadSimple } from 'phosphor-react';
import React from 'react';
import { useState } from 'react';
import { GradientFullBgLayout } from '~/components/GradientFullBgLayout';
import UploadWidget from '~/components/image-upload-widget';
import PageHeading from '~/components/page-heading';
import { PrimaryButton } from '~/components/primary-button';
import { SwitchNetwork } from '~/components/switch-network';
import { useWeb3Auth } from '~/contexts/auth';
import { chainMap, tokens } from '~/data';
import { useProtected } from '~/hooks/use-protected';
import { layoutNames } from '~/layouts';
import { createUser } from '~/server/firebaseUtils';

const Onboard = () => {
  const { address, isConnected } = useProtected();
  const [logoURL, setLogoURL] = useState(undefined);
  const [name, setName] = useState('');
  const [preferredToken, setPreferredToken] = useState('');
  const [preferredChain, setPreferredChain] = useState('');

  const handleOnUpload = (err, result, cloudinary) => {
    if (err) {
      setError(err);
      cloudinary.close({
        quiet: true,
      });
      return;
    }
    setLogoURL(result?.info?.secure_url);
  };

  const handleSubmit = () => {
    createUser();
  };

  return (
    <GradientFullBgLayout>
      <SwitchNetwork floating />
      {isConnected ? (
        <Box
          width="50vw"
          minWidth="24rem"
          p="6"
          rounded="lg"
          shadow="lg"
          background="white"
          height="80vh"
          overflow="auto"
        >
          <PageHeading>Welcome</PageHeading>
          <Text>Let&apos;s set up your account</Text>
          <Box as="form" mt="6" experimental_spaceY="4" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Merchant Name</FormLabel>
              <Input
                type="text"
                placeholder="Acme Corp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Company Logo</FormLabel>
              {logoURL && (
                <Image
                  my="4"
                  boxSize="150px"
                  objectFit="cover"
                  src={logoURL}
                  alt="haha"
                  border="1px"
                  borderColor="gray.300"
                  p="1"
                  rounded="md"
                />
              )}
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }

                  return (
                    <Button
                      leftIcon={<UploadSimple weight="bold" />}
                      onClick={handleOnClick}
                      variant="outline"
                      size="sm"
                    >
                      {logoURL ? 'Change Logo' : 'Add Logo'}
                    </Button>
                  );
                }}
              </UploadWidget>
              <Input type="url" value={logoURL} hidden />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Wallet Address</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Image
                    src="https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png"
                    alt={`Ethereum logo`}
                    width={5}
                    height={5}
                  />
                </InputLeftAddon>
                <Input type="text" disabled value={address} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Chain</FormLabel>
              <Select
                value={preferredChain}
                onChange={(event) => {
                  setPreferredChain(event.target.value);
                }}
              >
                {Object.entries(chainMap).map(([chainId, { name }]) => (
                  <option value={chainId} key={chainId}>
                    <Text>{name}</Text>
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Token</FormLabel>
              <Select
                value={preferredToken}
                onChange={(event) => {
                  setPreferredToken(event.target.value);
                }}
              >
                {tokens.map((token) => (
                  <option value={token.address} key={token.address}>
                    <Text>
                      {token.name} ({token.symbol})
                    </Text>
                  </option>
                ))}
              </Select>
            </FormControl>
            <Spacer />
            <PrimaryButton w="full" type="submit">
              Let&apos;s Go!
            </PrimaryButton>
          </Box>
        </Box>
      ) : (
        <Spinner />
      )}
    </GradientFullBgLayout>
  );
};

// Onboard.layout = layoutNames.MERCHANT_DASHBOARD;

export default Onboard;
