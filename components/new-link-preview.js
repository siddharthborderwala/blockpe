import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Lock, Question } from 'phosphor-react';
import React from 'react';
import { GradientFullBgLayout } from './GradientFullBgLayout';
import { Name } from './name';
import { PrimaryButton } from './primary-button';

const SectionHeading = ({ children }) => {
  return (
    <Heading
      as="h4"
      textTransform="uppercase"
      color="gray.500"
      letterSpacing="widest"
      fontSize="12px"
    >
      {children}
    </Heading>
  );
};

export const NewLinkPreview = ({
  merchantName,
  merchantWallet,
  merchantLogoURL,
  description,
  preferredToken,
}) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <GradientFullBgLayout>
      <Box
        as="form"
        padding="12"
        marginLeft={'4'}
        marginRight={'4'}
        background="white"
        width={500}
        maxHeight={{ base: '80vh', md: '60vh' }}
        rounded="lg"
        shadow="lg"
        overflowY="auto"
        onSubmit={onFormSubmit}
      >
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Image alt="Merchant Logo" boxSize="50px" src={merchantLogoURL} />
            <Flex alignItems="baseline">
              <Text fontSize="1.5rem" fontWeight="medium" mt="2" mr="2">
                {merchantName}
              </Text>
              <Tooltip
                label={
                  <Text>
                    Merchant Account Address:
                    <pre style={{ fontSize: '12px', fontWeight: 700 }}>
                      {merchantWallet}
                    </pre>
                  </Text>
                }
              >
                <Box mt="4">
                  <Question weight="bold" />
                </Box>
              </Tooltip>
            </Flex>
          </Box>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Name size="sm" />
          </Flex>
        </Flex>

        <Box mt="4">
          <SectionHeading>Payment Notes</SectionHeading>
          <Text fontSize="sm" mt="1">
            {description || 'No notes'}
          </Text>
        </Box>

        <Flex
          experimental_spaceX={{ base: 0, md: 4 }}
          experimental_spaceY="4"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <FormControl isRequired mt="4">
            <FormLabel as={SectionHeading}>Chain</FormLabel>
            <Select isRequired value={137} mt="1">
              {/* {chains.map((chain) => (
                <option value={chain.id} key={chain.id}>
                  <Text>{chain.name}</Text>
                </option>
              ))} */}
            </Select>
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel as={SectionHeading}>Token</FormLabel>
            <Select
              isRequired
              mt="1"
              value={'0x0000000000000000000000000000000000000000'}
            >
              {/* {tokensByChain[activeNetwork].map((token) => (
                <option value={token.address} key={token.address}>
                  <Text>
                    {token.name} ({token.symbol})
                  </Text>
                </option>
              ))} */}
            </Select>
          </FormControl>
        </Flex>

        <Flex
          experimental_spaceX={{ base: 0, md: 4 }}
          experimental_spaceY="4"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <FormControl isRequired mt="4">
            <FormLabel as={SectionHeading}>Amount</FormLabel>
            <InputGroup mt="1">
              <InputLeftAddon>
                <Image
                  src={preferredToken.logoURI}
                  alt={`${preferredToken.name} logo`}
                  width={5}
                  height={5}
                />
              </InputLeftAddon>
              <Input
                disabled={!merchantInfo.isEditAmountEnabled}
                type="text"
                placeholder={`Enter ${preferredToken.name}`}
                value={amount}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel as={SectionHeading}>INR Value</FormLabel>
            <InputGroup mt="1">
              <InputLeftAddon>
                <Image
                  src="/inr-logo.png"
                  alt={`INR logo`}
                  width={5}
                  height={5}
                />
              </InputLeftAddon>
              <Input
                disabled={!merchantInfo.isEditAmountEnabled}
                type="text"
                placeholder={`Enter ${preferredTokenId.name}`}
                value={`${Number(amount) * 101151}`}
              />
            </InputGroup>
          </FormControl>
        </Flex>

        <PrimaryButton
          width="100%"
          type="submit"
          mt="6"
          leftIcon={<Lock weight="bold" />}
        >
          Pay Securely
        </PrimaryButton>
      </Box>
    </GradientFullBgLayout>
  );
};
