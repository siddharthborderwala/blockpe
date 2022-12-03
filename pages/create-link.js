import {
  Box,
  Text,
  FormLabel,
  FormControl,
  Flex,
  Center,
  Select,
  InputGroup,
  InputRightAddon,
  Input,
} from '@chakra-ui/react';
import { tokens } from '~/data';
import Image from 'next/image';

const CreateLink = () => {
  return (
    <Center
      width="100vw"
      height="100vh"
      bgGradient="linear(to-r, blue.300, blue.500)"
    >
      <Box
        padding="8"
        background="white"
        rounded="lg"
        shadow="lg"
        width="75vw"
        height="75vh"
      >
        <FormControl>
          <Flex alignItems="center">
            <FormLabel marginRight="1rem">Name: </FormLabel>
            <Input type="text" placeholder="Foo" width="25rem" />
          </Flex>

          <Flex alignItems="center" marginTop="1rem">
            <FormLabel marginRight="1rem">Description: </FormLabel>
            <Input type="text" placeholder="This is me..." width="25rem" />
          </Flex>

          <Input value="0z123" width="25rem" marginTop="1.5rem" />

          <Flex marginTop="1.5rem">
            <InputGroup width="30rem" marginRight="1.5rem" isRequired>
              <Input type="number" placeholder="amount to receive" />
              <InputRightAddon>.eth</InputRightAddon>
            </InputGroup>

            <Select placeholder="Tokens" width="15rem" isRequired>
              {tokens.map((token) => (
                <option value="option1" key={token._id}>
                  <Image
                    src={token.logoURI}
                    alt={`${token.name} logo`}
                    width={20}
                    height={20}
                  />
                  <Text>
                    {token.name} ({token.symbol})
                  </Text>
                </option>
              ))}
            </Select>
          </Flex>
        </FormControl>
      </Box>
    </Center>
  );
};

export default CreateLink;
