import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const addressAtom = atomWithStorage('user:address', undefined);

export const useActiveAddress = () => {
  return useAtom(addressAtom);
};
