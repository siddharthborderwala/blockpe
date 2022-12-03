import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWeb3Auth } from '~/contexts/auth';
import { getUserByWalletAddress } from '~/server/firebaseUtils';

export const useUserId = () => {
  const { isConnected, address } = useWeb3Auth();
  const { replace } = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!isConnected) {
      replace('/join');
    }
  }, [isConnected, replace]);

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
        replace('/home/onboard');
      }
      setUserId(id);
    });
  }, [replace]);

  return {
    userId,
    address,
  };
};
