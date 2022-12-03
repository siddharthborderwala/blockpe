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
} from '@chakra-ui/react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { tokens } from '~/data';
import axios from 'axios';
import { GradientFullBgLayout } from '~/components/GradientFullBgLayout';
import { chainNameToIdentifierMap } from '~/constants';
import { capitalize } from '~/utils';
import { useWeb3Auth } from '~/contexts/auth';
import { PrimaryButton } from '~/components/primary-button';
import { SwitchNetwork } from '~/components/switch-network';

const Pay = ({ paymentId }) => {
  console.log({ paymentId });

  const [chainId, setChainId] = useState(5);
  const [amount, setAmount] = useState(0);
  const [isMetadataLoading, setIsMetadataLoading] = useState(false);

  const [merchantInfo, setMerchantInfo] = useState({});

  const [preferredToken, setPreferredToken] = useState({
    logoURI:
      'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
    name: 'ETH',
  });
  const { connect, loading, isConnected } = useWeb3Auth();

  const tokenList = useMemo(() => {
    const updatedTokenList = tokens.filter(
      (token) => token.chainId === chainId
    );
    setPreferredToken(updatedTokenList[0]);
    return updatedTokenList;
  }, [chainId]);

  const handleSelectChain = (event) => {
    setChainId(Number(event.target.value));
  };

  const handleTokenChange = (event) => {
    const token = tokenList.find(
      (token) => token.address === event.target.value
    );
    console.log({ token });
    setPreferredToken(token);
  };

  const handleWalletConnect = () => {
    connect();
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const fetchPaymentDetails = useCallback(async () => {
    try {
      setIsMetadataLoading(true);
      const res = await axios.get(`/api/links/${paymentId}`);
      const { metadata, status, userId } = res.data?.data;
      const { data } = await axios.get(`/api/users/${userId}`);
      const {
        preferred_chain_id,
        preferred_token_address,
        wallet_address,
        amount,
        notes,
        isEditAmountEnabled = false,
      } = metadata;
      setAmount(amount);
      setMerchantInfo({
        chainId: preferred_chain_id,
        tokenAddress: preferred_token_address,
        walletAddress: wallet_address,
        notes,
        name: data.data?.name,
        isEditAmountEnabled,
      });
    } catch (err) {
      console.log({ err });
    } finally {
      setIsMetadataLoading(false);
    }
  });

  useEffect(() => {
    fetchPaymentDetails();
  }, [paymentId]);

  // router protocol integration
  const onFormSubmit = async (event) => {
    console.log({ event });
  };

  return (
    <GradientFullBgLayout>
      <SwitchNetwork floating />

      <Box
        as="form"
        padding="12"
        marginLeft={'4'}
        marginRight={'4'}
        background="white"
        width={500}
        height={'70vh'}
        rounded="lg"
        shadow="lg"
        experimental_spaceY="2"
        onSubmit={onFormSubmit}
      >
        {isMetadataLoading ? (
          <Center w="full" h="full">
            <Spinner />
          </Center>
        ) : (
          <>
            <Flex justifyContent="space-between">
              <Text fontSize="2xl" fontWeight="bold">
                Pay - BlockPe
              </Text>
            </Flex>

            <Text fontSize="md" fontWeight="medium">
              {merchantInfo.name || 'Loading...'}
            </Text>
            <Text fontSize="lg">
              {merchantInfo.walletAddress || 'Loading...'}
            </Text>

            <Text fontSize="md" fontWeight="medium">
              Payment Notes
            </Text>
            <Text fontSize="lg" marginBottom={8}>
              {merchantInfo.notes || 'Loading...'}
            </Text>

            {/* <Center>
          <Text fontSize="4xl">(6xl) In love with React & Next</Text>
        </Center> */}
            <FormControl isRequired>
              <FormLabel>Chain</FormLabel>
              <Select isRequired value={chainId} onChange={handleSelectChain}>
                {Object.entries(chainNameToIdentifierMap).map(
                  ([key, value], index) => (
                    <option value={value} key={index}>
                      <Text>{capitalize(key)}</Text>
                    </option>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Token</FormLabel>
              <Select isRequired onChange={handleTokenChange}>
                {tokenList.map((token) => (
                  <option value={token.address} key={token._id}>
                    <Text>
                      {token.name} ({token.symbol})
                    </Text>
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <InputGroup marginBottom={8}>
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
                  type="string"
                  placeholder={`Enter ${preferredToken.name}`}
                  value={amount}
                  onChange={handleChangeAmount}
                />
              </InputGroup>
            </FormControl>
            <Center w="full">
              {!isConnected ? (
                <PrimaryButton
                  isLoading={loading}
                  size="lg"
                  width="100%"
                  type="button"
                  onClick={handleWalletConnect}
                >
                  Connect Wallet
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  width="100%"
                  size="lg"
                  type="submit"
                  onClick={onFormSubmit}
                >
                  Pay Now
                </PrimaryButton>
              )}
            </Center>
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
