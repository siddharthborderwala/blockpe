import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWeb3Auth } from '~/contexts/auth';
import { getUserByWalletAddress } from '~/server/firebaseUtils';
import { useProtected } from './use-protected';

export const useUserId = () => {
  const { address } = useWeb3Auth();
  const { replace } = useRouter();
  const [userId, setUserId] = useState(null);

  useProtected();

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUserByWalletAddress();
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
  }, [replace]);

  return {
    userId,
    address,
  };
};
