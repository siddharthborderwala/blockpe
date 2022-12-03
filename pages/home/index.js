import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import PageHeading from '~/components/page-heading';
import { SwitchNetwork } from '~/components/switch-network';
import { useWeb3Auth } from '~/contexts/auth';
import { useBetterAuth } from '~/contexts/better-auth';
import { useUserId } from '~/hooks/use-user-id';
import { layoutNames } from '~/layouts';

const HomePage = () => {
  const { userId, address } = useUserId();
  const { provider } = useBetterAuth();

  useEffect(() => {
    const res = provider.getSigner(address);
    console.log(res);
  }, [address, provider]);

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
