import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import React from 'react';
import PageHeading from '~/components/page-heading';
import { layoutNames } from '~/layouts';

const AllLinks = () => {
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
    </Box>
  );
};

AllLinks.layout = layoutNames.MERCHANT_DASHBOARD;

export default AllLinks;
