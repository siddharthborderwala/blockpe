import axios from 'axios';
import { useUserId } from '~/hooks/use-user-id';
import { useEffect, useState } from 'react';

export const useGetAllPaymentLinks = () => {
  const { userId } = useUserId();
  const [isLoading, setLoading] = useState(false);
  const [allLinks, setAllLinks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/links/user/${userId}`);
        setAllLinks(data.data);
      } catch (err) {
        console.log('links-index-err', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { isLoading, allLinks };
};
