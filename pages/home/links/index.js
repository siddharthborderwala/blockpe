import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Spinner,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Table,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { ClipboardText, Plus } from 'phosphor-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import PageHeading from '~/components/page-heading';
import { useUserId } from '~/hooks/use-user-id';
import { layoutNames } from '~/layouts';
import { PaymentURL } from '~/components/PaymentURL';
import dayjs from 'dayjs';
import { tokens } from '~/data';
import { PAYMENT_LINK_BASE_URL } from '~/constants';
import { useGetAllPaymentLinks } from '~/hooks/useGetAllPaymentLinks';

const AllLinks = () => {
  const { userId } = useUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!userId) return;

    axios.get(`/api/links/user/${userId}`).then(({ data }) => {
      setLinks(data.data);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <Grid templateRows="min-content 1fr" gap="8" height="full">
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
      {/* List of all the links fetched from the firebase collection paymentLinks */}
      <Box w="full" height="full">
        {isLoading ? (
          <Center h="full">
            <Spinner />
          </Center>
        ) : (
          <>
            {links ? (
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th isNumeric>Price</Th>
                      <Th>Link</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {links.map((l) => {
                      return (
                        <Tr key={l.id} justifyContent="space-between">
                          <Td>
                            <Link href={`links/${l.id}`}>{l.name}</Link>
                          </Td>
                          <Td isNumeric>{l.amount}</Td>
                          <Td display="flex" alignItems="center">
                            <pre style={{ fontSize: '12px', fontWeight: 500 }}>
                              {window.location.host + '/pay/' + l.id}
                            </pre>
                            <IconButton
                              size="xs"
                              ml="auto"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  window.location.host + '/pay/' + l.id
                                );
                                toast({
                                  status: 'info',
                                  title: 'Copied to clipboard',
                                });
                              }}
                              icon={<ClipboardText />}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Center h="full">
                <Text>No Links</Text>
              </Center>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
};

AllLinks.layout = layoutNames.MERCHANT_DASHBOARD;

export default AllLinks;
