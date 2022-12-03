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
import React, { useEffect } from 'react';
import PageHeading from '~/components/page-heading';
import { layoutNames } from '~/layouts';
import { PaymentURL } from '~/components/PaymentURL';
import dayjs from 'dayjs';
import axios from 'axios';
import { PAYMENT_LINK_BASE_URL } from '~/constants';

const AllLinks = () => {
  const date = dayjs('2022-11-28T17:53:23Z').format('(MMM DD, YYYY) hh:mm A');
  const url = `${PAYMENT_LINK_BASE_URL}/abc`;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/links/user/${'userId'}`);

      console.log('data', data);
    })();
  }, []);

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
            <Tr>
              <Td>{date}</Td>
              <Td>
                <PaymentURL linkURL={url} textProps={{ width: '25rem' }} />
              </Td>
              <Td isNumeric>0.01 ETH</Td>
              <Td>Active</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

AllLinks.layout = layoutNames.MERCHANT_DASHBOARD;

export default AllLinks;
