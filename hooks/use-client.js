import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';

// create a hook to use metamask extension defined at window.ethereum
export const useClient = (clientName = 'ethereum') => {
  const provider = useRef(null);

  useEffect(() => {
    if (window && window[clientName]) {
      provider.current = new ethers.providers.Web3Provider(window[clientName]);
    }
  }, [clientName]);

  return provider;
};
