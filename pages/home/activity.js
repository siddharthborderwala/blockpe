import { layoutNames } from '~/layouts';
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import PageHeading from '~/components/page-heading';
import axios from 'axios';
import { useGetAllPaymentLinks } from '~/hooks/useGetAllPaymentLinks';
import { useBetterAuth } from '~/contexts/better-auth';
import { getActivityByChainId } from '~/server/covalentUtils';

const Activity = () => {
  // const { account } = useBetterAuth();
  const { isLoading, allLinks } = useGetAllPaymentLinks();

  const account = '0x18D75D38538Aa13DdC643841303D156C99c19dED';

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        let allLinksChainIds = allLinks?.map(
          (link) => link.metadata.preferred_chain_id
        );
        allLinksChainIds = [...new Set(allLinksChainIds)];

        // const { data } = await Promise.all(
        //   allLinksChainIds.map((id) =>
        //     axios.get(
        //       `https://api.covalenthq.com/v1/${137}/address/${account}/transactions_v2/?key=ckey_bad512c2a8964e748e5b5fcf7a4`
        //     )
        //   )
        // );

        // const { data } = await axios.get(
        //   `https://api.covalenthq.com/v1/${250}/address/${account}/transactions_v2/?key=ckey_bad512c2a8964e748e5b5fcf7a4`
        // );

        const data = await getActivityByChainId(account, 250);

        console.log('data', data);
      }
    })();
  }, [account, allLinks, isLoading]);

  return (
    <Box>
      <Box>
        <PageHeading>Activity</PageHeading>
        <Text>Things you did</Text>
      </Box>

      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              <Th>Role</Th>
              <Th isNumeric>Wallet Address</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>HH:MM:SS</Td>
              <Td>Sender</Td>
              <Td isNumeric>0x1223</Td>
              <Td isNumeric>0.111 ETH</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Activity.layout = layoutNames.MERCHANT_DASHBOARD;

export default Activity;
