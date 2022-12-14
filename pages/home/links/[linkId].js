import { layoutNames } from '~/layouts';
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Image,
  Divider,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import QRCode from 'qrcode';
import PageHeading from '~/components/page-heading';
import { tokens } from '~/data';
import axios from 'axios';
import { PaymentURL } from '~/components/PaymentURL';
import { PAYMENT_LINK_BASE_URL } from '~/constants';
import { useRouter } from 'next/router';

const opts = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  quality: 0.3,
  color: {
    light: '#FFF',
  },
};

const PaymentLink = () => {
  const {
    query: { linkId },
  } = useRouter();
  const [qrCodeSrc, setQRCodeSrc] = useState('');
  const paymentLink = useMemo(
    () => `${PAYMENT_LINK_BASE_URL}/${linkId ?? ''}`,
    [linkId]
  );

  const [paymentLinkInfo, setPaymentLinkInfo] = useState({});
  const [isPaymentLinkInfoLoading, setIsPaymentLinkInfoLoading] =
    useState(false);

  useEffect(() => {
    QRCode.toDataURL(paymentLink, opts, function (err, url) {
      if (err) {
        console.log('qrcode-error', err);
      }

      setQRCodeSrc(url);
    });
  }, [paymentLink]);

  const fetchPaymentDetails = useCallback(async () => {
    try {
      setIsPaymentLinkInfoLoading(true);
      const res = await axios.get(`/api/links/${linkId}`);
      const { userId, ...metadata } = res.data?.data;
      const { name, amount, description } = metadata;

      const { data } = await axios.get(`/api/users/${userId}`);

      setPaymentLinkInfo({
        description,
        name,
        amount,
      });
    } catch (err) {
      console.log({ err });
    } finally {
      setIsPaymentLinkInfoLoading(false);
    }
  }, [linkId]);

  useEffect(() => {
    fetchPaymentDetails();
  }, [fetchPaymentDetails]);

  return (
    <Grid templateColumns="3fr 10px 3fr">
      <GridItem colSpan={3}>
        <Box>
          <PageHeading>Payment Link</PageHeading>
          <Text>Share this link and get your payment</Text>
        </Box>
      </GridItem>

      {isPaymentLinkInfoLoading ? (
        <GridItem padding="1rem 1rem 1rem 0">
          <Center w="10rem" h="4rem">
            <Spinner />
          </Center>
        </GridItem>
      ) : (
        <>
          <GridItem>
            <Box padding="2rem 4rem 2rem 0">
              <Image
                src="/eth-hero.jpg"
                alt=""
                width={20}
                height={20}
                objectFit="cover"
                borderRadius="2xl"
              />

              <Box marginTop="1.2rem">
                <Text as="strong" fontSize="1.2rem">
                  Name:{' '}
                </Text>
                <Text>{paymentLinkInfo.name}</Text>
              </Box>

              <Box marginTop="1.2rem">
                <Text as="strong" fontSize="1.2rem">
                  Payment Notes:{' '}
                </Text>
                <Text>{paymentLinkInfo.description}</Text>
              </Box>

              <Box mt="5">
                <Text as="strong" fontSize="1.2rem">
                  Amount
                </Text>
                <Text>{paymentLinkInfo.amount}</Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <Divider orientation="vertical" />
          </GridItem>

          <GridItem>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              padding="2rem 8rem 2rem 0"
            >
              <PaymentURL
                linkURL={paymentLink}
                linkProps={{ fontSize: '1.3rem', marginBottom: '2rem' }}
                textProps={{ width: '25rem' }}
              />

              <Flex alignItems="center">
                <Divider width="6rem" />
                <Text margin="0 1rem" color="gray.600">
                  or
                </Text>
                <Divider width="6rem" />
              </Flex>

              <Box width="15rem" height="15rem">
                <Image
                  src={qrCodeSrc}
                  alt="qr-code"
                  height="100%"
                  width="100%"
                />
              </Box>
            </Flex>
          </GridItem>
        </>
      )}
    </Grid>
  );
};

PaymentLink.layout = layoutNames.MERCHANT_DASHBOARD;

export default PaymentLink;
