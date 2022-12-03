import { layoutNames } from '~/layouts';
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Link,
  Image,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import PageHeading from '~/components/page-heading';

const opts = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  quality: 0.3,
  color: {
    light: '#FFF',
  },
};

const PaymentLink = () => {
  const qrCodeRef = useRef(null);
  const paymentLink = 'https://blockpe.com/123';

  useEffect(() => {
    QRCode.toDataURL(paymentLink, opts, function (_, url) {
      qrCodeRef.current && (qrCodeRef.current.src = url);
    });
  }, []);

  return (
    <Grid templateColumns="3fr 10px 3fr">
      <GridItem colSpan={3}>
        <Box>
          <PageHeading>Payment Link</PageHeading>
          <Text>Share this link and get your pay</Text>
        </Box>
      </GridItem>

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
            <Text>BlockPe</Text>
          </Box>

          <Box marginTop="1.2rem">
            <Text as="strong" fontSize="1.2rem">
              Description:{' '}
            </Text>
            <Text>This is BlockPe</Text>
          </Box>

          <Box marginTop="1.2rem">
            <Text as="strong" fontSize="1.2rem">
              Expires In:{' '}
            </Text>
            <Text>6 hrs</Text>
          </Box>

          <Flex justifyContent="space-between" marginTop="1.2rem">
            <Box>
              <Text as="strong" fontSize="1.2rem">
                Token:{' '}
              </Text>
              <Text>ETH</Text>
            </Box>

            <Box>
              <Text as="strong" fontSize="1.2rem">
                Amount:{' '}
              </Text>
              <Text>0.001</Text>
            </Box>
          </Flex>
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
          <Link
            href={paymentLink}
            isExternal
            fontSize="1.3rem"
            marginBottom="2rem"
            color="blue.700"
          >
            {paymentLink}
          </Link>

          <Flex alignItems="center">
            <Divider width="6rem" />
            <Text margin="0 1rem" color="gray.600">
              or
            </Text>
            <Divider width="6rem" />
          </Flex>

          <Box width="15rem" height="15rem">
            <Image
              src=""
              alt="qr-code"
              ref={qrCodeRef}
              height="100%"
              width="100%"
            />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

PaymentLink.layout = layoutNames.MERCHANT_DASHBOARD;

export default PaymentLink;
