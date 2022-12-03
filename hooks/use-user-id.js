import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWeb3Auth } from '~/contexts/auth';
import { useBetterAuth } from '~/contexts/better-auth';
import { getUserByWalletAddress } from '~/server/firebaseUtils';
import { useProtected } from './use-protected';

export const useUserId = () => {
  const { account } = useBetterAuth();
  const { replace } = useRouter();
  const [userId, setUserId] = useState(null);

  useProtected();

  useEffect(() => {
    const loadUser = async () => {
      if (!account) return null;
      const user = await getUserByWalletAddress(account);
      if (user) {
        return user.id;
      }
      return null;
    };

    loadUser().then((id) => {
      if (!id) {
        replace('/onboard');
      }
      setUserId(id);
    });
  }, [account, replace]);

  return {
    userId,
    account,
  };
};
