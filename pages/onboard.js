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
  Textarea,
  Divider,
  useToast,
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
import { tokensByChain, chains } from '~/data';
import { useProtected } from '~/hooks/use-protected';
import { layoutNames } from '~/layouts';
import { createUser } from '~/server/firebaseUtils';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserId } from '~/hooks/use-user-id';

const Onboard = () => {
  const { account, isConnected } = useProtected();
  const { userId } = useUserId();
  const [logoURL, setLogoURL] = useState(undefined);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preferredToken, setPreferredToken] = useState(
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
  );
  const [preferredChain, setPreferredChain] = useState('137');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { replace } = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userId = await createUser({
        name: name,
        description: description,
        preferred_token_address: preferredToken,
        preferred_chain_id: preferredChain,
        wallet_address: account,
        logoUrl: logoURL,
      });
      replace('/home/links');
    } catch (err) {
      toast({
        status: 'error',
        title: 'Failed to Register',
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (userId) {
      replace('/home/links');
    }
  }, [userId]);

  const selectedChain = chains.find(({ id }) => Number(preferredChain) === id);

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
                placeholder="BlockPe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A little about your company (Optional Field)"
              ></Textarea>
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
            <Divider />
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
                <Input type="text" disabled value={account} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Chain</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Image
                    src={
                      selectedChain?.logoURI ??
                      'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png'
                    }
                    alt={`${selectedChain?.name} logo`}
                    width={5}
                    height={5}
                  />
                </InputLeftAddon>
                <Select
                  value={preferredChain}
                  onChange={(event) => {
                    setPreferredChain(event.target.value);
                  }}
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                >
                  {chains.map(({ id, name }) => (
                    <option value={id} key={id}>
                      <Text>{name}</Text>
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Token</FormLabel>
              <Select
                value={preferredToken}
                onChange={(event) => {
                  setPreferredToken(event.target.value);
                }}
              >
                {tokensByChain[Number(preferredChain)].map((token) => (
                  <option value={token.address} key={token.address}>
                    <Text>
                      {token.name} ({token.symbol})
                    </Text>
                  </option>
                ))}
              </Select>
            </FormControl>
            <PrimaryButton w="full" type="submit" isLoading={isSubmitting}>
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
