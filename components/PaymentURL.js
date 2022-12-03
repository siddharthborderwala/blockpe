import { Link, Text } from '@chakra-ui/react';

export const PaymentURL = ({ linkURL, linkProps, textProps }) => {
  return (
    <Link href={linkURL} isExternal color="blue.700" {...linkProps}>
      <Text noOfLines={1} {...textProps}>
        {linkURL}
      </Text>
    </Link>
  );
};
