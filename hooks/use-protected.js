import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useWeb3Auth } from '~/contexts/auth';

export const useProtected = () => {
  const { isConnected, address } = useWeb3Auth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      replace('/join');
    }
  }, [isConnected, replace]);

  return { address, isConnected };
};
