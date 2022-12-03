import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const addressAtom = atom('user:address', undefined);

export const useActiveAddress = () => {
  return useAtom(addressAtom);
};
