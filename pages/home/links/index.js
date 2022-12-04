import {
  Box,
  Button,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import React from 'react';
import PageHeading from '~/components/page-heading';
import { layoutNames } from '~/layouts';
import { PaymentURL } from '~/components/PaymentURL';
import dayjs from 'dayjs';
import { tokens } from '~/data';
import { PAYMENT_LINK_BASE_URL } from '~/constants';
import { useGetAllPaymentLinks } from '~/hooks/useGetAllPaymentLinks';

const AllLinks = () => {
  const { isLoading, allLinks } = useGetAllPaymentLinks();

  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Box>
          <PageHeading>Payment Links</PageHeading>
          <Text>Create customized links to receive payments</Text>
        </Box>
        <Button
          leftIcon={<Plus weight="bold" />}
          size="sm"
          as={Link}
          href="links/new"
        >
          New
        </Button>
      </Flex>

      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              <Th>Link</Th>
              <Th isNumeric>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allLinks.length > 0 ? (
              allLinks.map((link) => {
                const date = dayjs(link.metadata.timestamp).format(
                  '(MMM DD, YYYY) hh:mm A'
                );

                const tokenSymbol = tokens.find(
                  (token) =>
                    token.address === link.metadata.preferred_token_address
                )?.symbol;

                return (
                  <Tr key={link.id}>
                    <Td>{date}</Td>
                    <Td>
                      <PaymentURL
                        linkURL={`${PAYMENT_LINK_BASE_URL}/${link.id}`}
                        textProps={{ width: '25rem' }}
                      />
                    </Td>
                    <Td isNumeric>
                      {link.metadata.amount} {tokenSymbol}
                    </Td>
                    <Td>
                      {link.status[0] + link.status.slice(1).toLowerCase()}
                    </Td>
                  </Tr>
                );
              })
            ) : isLoading ? (
              <Tr>
                <Td colSpan={4}>
                  <Text textAlign="center" padding="1rem">
                    Getting all the payment links...
                  </Text>
                </Td>
              </Tr>
            ) : (
              <Tr>
                <Td colSpan={4}>
                  <Text textAlign="center" padding="1rem">
                    Nothing to show
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

AllLinks.layout = layoutNames.MERCHANT_DASHBOARD;

export default AllLinks;
