import { atom, useAtom } from 'jotai';

export const activeNetworkAtom = atom(1);

export const useActiveNetwork = () => {
  return useAtom(activeNetworkAtom);
};
