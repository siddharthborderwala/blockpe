import { Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';

const PageHeading = ({ children }) => {
  return (
    <>
      <Head>
        <title>{children}</title>
      </Head>
      <Heading as="h3" fontSize="1.5rem" fontWeight="black">
        {children}
      </Heading>
    </>
  );
};

export default PageHeading;
