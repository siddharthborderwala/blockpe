import React from 'react';
import { SwitchNetwork } from '~/components/switch-network';
// import { useAccount } from '~/hooks/use-account';

const HomePage = () => {
  // const { account } = useAccount();

  return (
    <div>
      <SwitchNetwork />
      {/* Hi <strong>{account}</strong> */}
    </div>
  );
};

export default HomePage;
