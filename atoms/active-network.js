import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

// Set the string key and the initial value
const activeNetworkAtom = atomWithStorage('network:active', 1)

export const useActiveNetwork = () => {
  return useAtom(activeNetworkAtom);
};
