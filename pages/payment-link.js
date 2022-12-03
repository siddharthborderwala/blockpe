import { GradientFullBgLayout } from '~/components/GradientFullBgLayout';

import { Box, Flex, Link, Image, Divider, Text } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

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
    <GradientFullBgLayout>
      <Box
        padding="16"
        background="white"
        rounded="lg"
        shadow="lg"
        width="75vw"
        height="75vh"
        experimental_spaceY="4"
      >
        <Flex justifyContent="space-between">
          <Box width="100%">
            <Text as="strong" fontSize="1.3rem">
              Name:{' '}
            </Text>
            <Text>BlockPe</Text>

            <Text as="strong" fontSize="1.3rem">
              Description:{' '}
            </Text>
            <Text>This is BlockPe</Text>

            <Flex justifyContent="space-between">
              <Box>
                <Text as="strong" fontSize="1.3rem">
                  Token:{' '}
                </Text>
                <Text>ETH</Text>
              </Box>

              <Box>
                <Text as="strong" fontSize="1.3rem">
                  Amount:{' '}
                </Text>
                <Text>0.001</Text>
              </Box>
            </Flex>
          </Box>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding="4rem"
          >
            <Link
              href={paymentLink}
              isExternal
              fontSize="1.5rem"
              marginBottom="2rem"
              color="blue.700"
            >
              {paymentLink}
            </Link>

            <Flex alignItems="center">
              <Divider width="12rem" />
              <Text margin="0 1rem" color="gray.600">
                or
              </Text>
              <Divider width="12rem" />
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
        </Flex>
      </Box>
    </GradientFullBgLayout>
  );
};

export default PaymentLink;
