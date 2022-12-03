import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import PageHeading from '~/components/page-heading';
import { SwitchNetwork } from '~/components/switch-network';
import { useWeb3Auth } from '~/contexts/auth';
import { layoutNames } from '~/layouts';

const HomePage = () => {
  // const { account } = useAccount();
  const { isConnected, address } = useWeb3Auth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      replace('/join');
    }
  }, [isConnected, replace]);

  return (
    <div>
      <PageHeading>Overview</PageHeading>
      <Text>
        Hi <strong>{address}</strong>
      </Text>
    </div>
  );
};

HomePage.layout = layoutNames.MERCHANT_DASHBOARD;

export default HomePage;
