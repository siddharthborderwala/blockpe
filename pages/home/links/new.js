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
  Grid,
  GridItem,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { tokens } from '~/data';
import axios from 'axios';
import { GradientFullBgLayout } from '~/components/GradientFullBgLayout';
import { layoutNames } from '~/layouts';
import { Plus } from 'phosphor-react';
import { PrimaryButton } from '~/components/primary-button';
import PageHeading from '~/components/page-heading';

const expireOptions = [0, 6, 12, 24];

const CreateLink = () => {
  const router = useRouter();
  const [merchantData, setMerchantData] = useState({
    name: '',
    description: '',
  });
  const [tokenInfo, setTokenInfo] = useState({
    amount: '',
    chainId: '',
    tokenAddress: '0x0000000000000000000000000000000000000000', // eth-address
  });

  const [selectedToken, setSelectedToken] = useState({
    logoURI:
      'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
    name: 'ETH',
  });
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    const selectedToken = tokens.find(
      (token) => token.address === tokenInfo.tokenAddress
    );

    setSelectedToken({
      logoURI: selectedToken.logoURI,
      name: selectedToken.name,
    });

    setTokenInfo((prev) => ({ ...prev, chainId: selectedToken.chainId }));
  }, [tokenInfo.tokenAddress]);

  // to Resolve - Error: Hydration failed because the initial UI does not match what was rendered on the server.
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  const updateMerchantData = (event) => {
    setMerchantData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      ...merchantData,
      amount: tokenInfo.amount,
      expiry: expiresIn,
      preferred_token_address: tokenInfo.tokenAddress,
      chainId: tokenInfo.chainId,
      wallet_address: '0x111',
    };

    const { data } = await axios.post('/api/links/new', { data: requestData });
    console.log('data', data);
    router.push(`/home/links/${data.payment_id}`);
  };

  return (
    <Grid templateColumns="4fr 3fr">
      <GridItem>
        <Box>
          <PageHeading>Create Link</PageHeading>
          <Text>Create customized links to receive payments</Text>
        </Box>

        <Box as="form" experimental_spaceY="4" mt="8" onSubmit={onFormSubmit}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              width="full"
              type="text"
              placeholder="BlockPe"
              name="name"
              value={merchantData.name}
              onChange={updateMerchantData}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Expires In</FormLabel>
            <Select
              width="12rem"
              value={expiresIn}
              onChange={(event) => setExpiresIn(Number(event.target.value))}
            >
              {expireOptions.map((value) => (
                <option value={value} key={value}>
                  {value} hrs
                </option>
              ))}
            </Select>
            {expiresIn === 0 ? (
              <FormHelperText>
                Value 0 means the link does not expire
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              placeholder="BlockPe is a platform to help you to create a shareable payment link"
              name="description"
              value={merchantData.description}
              onChange={updateMerchantData}
            />
          </FormControl>

          <Input value="0z123" hidden />

          <Flex>
            <FormControl isRequired>
              <FormLabel>Token</FormLabel>
              <Select
                width="15rem"
                isRequired
                value={tokenInfo.tokenAddress}
                onChange={(event) => {
                  setTokenInfo((prev) => ({
                    ...prev,
                    tokenAddress: event.target.value,
                  }));
                }}
              >
                {tokens.map((token) => (
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
              <InputGroup>
                <InputLeftAddon>
                  <Image
                    src={selectedToken.logoURI}
                    alt={`${selectedToken.name} logo`}
                    width={5}
                    height={5}
                  />
                </InputLeftAddon>
                <Input
                  type="string"
                  placeholder="amount to receive"
                  value={tokenInfo.amount}
                  onChange={(event) =>
                    setTokenInfo((prev) => ({
                      ...prev,
                      amount: event.target.value,
                    }))
                  }
                />
              </InputGroup>
            </FormControl>
          </Flex>

          <Spacer />

          <PrimaryButton width="full" type="submit">
            Create
          </PrimaryButton>
        </Box>
      </GridItem>
    </Grid>
  );
};

CreateLink.layout = layoutNames.MERCHANT_DASHBOARD;

export default CreateLink;
