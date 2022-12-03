import React from 'react';
import { useWeb3Auth } from '~/contexts/auth';
import { layoutNames } from '~/layouts';

const Onboard = () => {
  const { address } = useWeb3Auth();

  return <div>Onboard</div>;
};

// Onboard.layout = layoutNames.MERCHANT_DASHBOARD;

export default Onboard;
