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
import PageHeading from '~/components/page-heading';

const Activity = () => {
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
