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
import { chains, tokens, tokensByChain } from '~/data';
import axios from 'axios';
import { GradientFullBgLayout } from '~/components/GradientFullBgLayout';
import { layoutNames } from '~/layouts';
import { Plus } from 'phosphor-react';
import { PrimaryButton } from '~/components/primary-button';
import PageHeading from '~/components/page-heading';
import { useBetterAuth } from '~/contexts/better-auth';
import { useUserId } from '~/hooks/use-user-id';

const expireOptions = [0, 6, 12, 24];

const CreateLink = () => {
  const { userId, account } = useUserId();
  const router = useRouter();
  const [merchantData, setMerchantData] = useState(null);
  const [amount, setAmount] = useState('');
  const [linkName, setLinkName] = useState('');
  const [linkDescription, setLinkDescription] = useState('');

  // to Resolve - Error: Hydration failed because the initial UI does not match what was rendered on the server.
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('/api/links/new', {
      wallet_address: merchantData.wallet_address,
      name: linkName,
      amount: amount,
      description: linkDescription,
      active: true,
    });

    router.push(`/home/links/${data.payment_id}`);
  };

  useEffect(() => {
    if (userId) {
      axios.get('/api/users/' + userId).then((res) => {
        const { data } = res;
        if (!data.data) return;
        setMerchantData(data.data);
      });
    }
  }, [userId]);

  if (!showChild) {
    return null;
  }

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
              placeholder="Lavender Scented Candle"
              name="name"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              placeholder="This scented candle is the perfect mixture of soothing and awakening"
              name="description"
              value={linkDescription}
              onChange={(e) => setLinkDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                {merchantData && (
                  <Image
                    alt="L"
                    h={5}
                    w={5}
                    src={
                      tokensByChain[merchantData.preferred_chain_id].find(
                        ({ address }) =>
                          address === merchantData.preferred_token_address
                      ).logoURI
                    }
                  ></Image>
                )}
              </InputLeftAddon>
              <Input
                type="text"
                placeholder="2.50"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputGroup>
          </FormControl>

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
