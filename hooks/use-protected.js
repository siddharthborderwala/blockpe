import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useWeb3Auth } from '~/contexts/auth';
import { useBetterAuth } from '~/contexts/better-auth';

export const useProtected = () => {
  const { isConnected, account } = useBetterAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      replace('/join');
    }
  }, [isConnected]);

  return { account, isConnected };
};
