import {
  Box,
  Button,
  Text,
  Image,
  FormLabel,
  FormControl,
  Flex,
  Center,
  Select,
  InputGroup,
  InputLeftAddon,
  Input,
  FormHelperText,
  Textarea,
  Spinner,
  Tooltip,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { chains, tokens, tokensByChain } from '~/data';
import axios from 'axios';
import { GradientFullBgLayout } from '~/components/GradientFullBgLayout';
import { useWeb3Auth } from '~/contexts/auth';
import { PrimaryButton } from '~/components/primary-button';
import { SwitchNetwork } from '~/components/switch-network';
import { useBetterAuth } from '~/contexts/better-auth';
import { useActiveNetwork } from '~/atoms/active-network';
import { Name } from '~/components/name';
import { Lock, Question } from 'phosphor-react';
import {
  getRouterProtocolInstance,
  makeTransaction,
} from '~/server/routerProtocolUtils';
import { ethers } from 'ethers';
import { convertFromTokenToToken } from '~/data/rates';

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

const Pay = ({ paymentId }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const [isMetadataLoading, setIsMetadataLoading] = useState(false);
  const [merchantInfo, setMerchantInfo] = useState({});
  const [preferredTokenId, setPreferredTokenId] = useState(
    '0x0000000000000000000000000000000000000000'
  );
  const toast = useToast();
  const [activeNetwork, setActiveNetwork] = useActiveNetwork();
  const { connect, isLoading, isConnected, provider, account } =
    useBetterAuth();

  const [inProgress, setInProgress] = useState(false);

  const tokens = tokensByChain[activeNetwork];

  const preferredToken = tokens.find(
    (token) => token.address === preferredTokenId
  );

  const handleNetworkChange = useCallback(
    async (chainId) => {
      console.log(chainId);
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
    [provider, setActiveNetwork, toast]
  );

  const handleSelectChain = (event) => {
    handleNetworkChange(Number(event.target.value));
  };

  const handleTokenChange = (event) => {
    setPreferredTokenId(event.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const fetchPaymentDetails = useCallback(async () => {
    try {
      setIsMetadataLoading(true);
      const { data: res } = await axios.get(`/api/links/${paymentId}`);
      const paymentLink = res.data;

      const { data: resUser } = await axios.get(
        `/api/users/${paymentLink.userId}`
      );
      const user = resUser.data;

      setName(paymentLink.name);
      const coin = tokens.find(token => token.address === user.preferred_token_address);
      const conversionFactor = convertFromTokenToToken(coin.coinKey, preferredToken.coinKey);
      setAmount((Number(paymentLink.amount)  * Number(conversionFactor)).toFixed(4));

      setDescription(paymentLink.description);

      setMerchantInfo({
        chainId: user.preferred_chain_id,
        tokenAddress: user.preferred_token_address,
        walletAddress: user.wallet_address,
        name: user.name,
        logoURL: user.logoUrl,
      });
    } catch (err) {
      console.log({ err });
    } finally {
      setIsMetadataLoading(false);
    }
  }, [paymentId]);

  const feeTokenAddress = useMemo(() =>
    tokensByChain[activeNetwork].find((token) => token.coinKey === 'USDC').address,
    [activeNetwork]
  );

  useEffect(() => {
    fetchPaymentDetails();
  }, [fetchPaymentDetails, paymentId]);

  // router protocol integration
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const args = {
      fromTokenAddress: preferredTokenId, // USDC on Polygon
      toTokenAddress: merchantInfo.tokenAddress, // FTM on Fantom
      amount: ethers.utils
        .parseUnits(amount, preferredToken.decimal)
        .toString(),
      fromTokenChainId: merchantInfo.chainId, //  Polygon
      toTokenChainId: activeNetwork, // Fantom
      userAddress: account,
      feeTokenAddress, // ROUTE on Polygon
      slippageTolerance: 1.0,
      widgetId: 24, // get your unique wdiget id by contacting us on Telegram
      destReceiverAddress: merchantInfo.walletAddress,
    };
    try {
      setInProgress(true);
      await makeTransaction(args, activeNetwork, provider);
      toast({ status: 'success', title: 'Success', description: 'Amount has been received', onCloseComplete: () => window.close()});
    } catch (err) {
      console.log('tx err', err);
      toast({ status: 'error', title: 'Error', description: 'Transaction could not be processed'});
    } finally {
      setInProgress(false);
    }
  };

  return (
    <GradientFullBgLayout>
      <Box
        as="form"
        padding={{ base: '6', md: '8' }}
        marginLeft={'4'}
        marginRight={'4'}
        background="white"
        width={500}
        maxHeight={{ base: '80vh', md: '70vh' }}
        rounded="lg"
        shadow="lg"
        overflowY="auto"
        onSubmit={onFormSubmit}
      >
        {isMetadataLoading ? (
          <Center w="full" h="full">
            <Spinner />
          </Center>
        ) : (
          <>
            <Flex justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Image
                  alt="Merchant Logo"
                  boxSize="50px"
                  src={merchantInfo.logoURL}
                />
                <Flex alignItems="baseline">
                  <Text fontSize="1.5rem" fontWeight="medium" mt="2" mr="2">
                    {merchantInfo.name}
                  </Text>
                  <Tooltip
                    label={
                      <Text>
                        Merchant Account Address:
                        <pre style={{ fontSize: '12px', fontWeight: 700 }}>
                          {merchantInfo.walletAddress}
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
              <SectionHeading>Product Name</SectionHeading>
              <Text fontSize="sm" mt="1">
                {name}
              </Text>
            </Box>

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
                <Select
                  isRequired
                  value={activeNetwork}
                  onChange={handleSelectChain}
                  mt="1"
                >
                  {chains.map((chain) => (
                    <option value={chain.id} key={chain.id}>
                      <Text>{chain.name}</Text>
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired mt="4">
                <FormLabel as={SectionHeading}>Token</FormLabel>
                <Select isRequired onChange={handleTokenChange} mt="1">
                  {tokensByChain[activeNetwork].map((token) => (
                    <option value={token.address} key={token.address}>
                      <Text>
                        {token.name} ({token.symbol})
                      </Text>
                    </option>
                  ))}
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
                    onChange={handleChangeAmount}
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
                    onChange={handleChangeAmount}
                  />
                </InputGroup>
              </FormControl>
            </Flex>

            {!isConnected ? (
              <PrimaryButton
                isLoading={isLoading}
                width="100%"
                type="button"
                mt="6"
                onClick={connect}
                leftIcon={<Lock weight="bold" />}
              >
                Connect Wallet
              </PrimaryButton>
            ) : (
              <PrimaryButton
                isLoading={inProgress}
                width="100%"
                type="submit"
                mt="6"
                leftIcon={<Lock weight="bold" />}
              >
                Pay Securely
              </PrimaryButton>
            )}
          </>
        )}
      </Box>
    </GradientFullBgLayout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      paymentId: params?.paymentId,
    }, // will be passed to the page component as props
  };
}

export default Pay;
