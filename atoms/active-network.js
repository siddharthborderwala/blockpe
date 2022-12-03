import { atom, useAtom } from 'jotai';

export const chains = {
  '0x1': {
    chainName: 'Ethereum Mainnet',
  },
  '0x5': {
    chainName: 'Goerli Testnet',
  },
};

export const activeNetworkAtom = atom('0x1');

export const useActiveNetwork = () => {
  return useAtom(activeNetworkAtom);
};
