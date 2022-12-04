export const EVM_CHAINS = {
  ETHEREUM: 'ETHEREUM',
  OPTIMISM: 'OPTIMISM',
  ARBITRUM: 'ARBITRUM',
  POLYGON: 'POLYGON',
  BNB: 'BNB',
  FANTOM: 'FANTOM',
  AVALANCHE: 'AVALANCHE',
  CRONOS: 'CRONOS',
  HARMONY: 'HARMONY',
  KAVA: 'KAVA',
  AURORA: 'AURORA',
  GOERLI: 'GOERLI',
};

export const chainNameToIdentifierMap = {
  [EVM_CHAINS.ETHEREUM]: 1,
  [EVM_CHAINS.OPTIMISM]: 10,
  [EVM_CHAINS.ARBITRUM]: 42161,
  [EVM_CHAINS.POLYGON]: 137,
  [EVM_CHAINS.BNB]: 56,
  [EVM_CHAINS.FANTOM]: 250,
  [EVM_CHAINS.AVALANCHE]: 43114,
  [EVM_CHAINS.CRONOS]: 25,
  [EVM_CHAINS.HARMONY]: 1666600000,
  [EVM_CHAINS.KAVA]: 2222,
  [EVM_CHAINS.AURORA]: 1313161554,
  [EVM_CHAINS.GOERLI]: 5,
};

export const PAYMENT_LINK_STATUS = {
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'IN_ACTIVE',
};

export const COVALENT_BASE_URL = 'https://api.covalenthq.com/v1';

export const RPC_URL_MAP = {
  1: 'https://mainnet.infura.io/v3/8f4a4a4f4c4b4c4a8f4a4a4f4c4b4c4a',
  10: 'https://mainnet.optimism.io',
  42161:
    'https://arb-mainnet.g.alchemy.com/v2/IhR5U7voO1FpUS3qn-58FYxlPndKtPnk',
  137: 'https://polygon-rpc.com',
  56: 'https://bsc-dataseed.binance.org',
  250: 'https://rpc.ftm.tools',
  43114: 'https://api.avax.network/ext/bc/C/rpc',
  25: [EVM_CHAINS.CRONOS],
  1666600000: [EVM_CHAINS.HARMONY],
  2222: [EVM_CHAINS.KAVA],
  1313161554: [EVM_CHAINS.AURORA],
  5: 'https://goerli.infura.io/v3/',
};

export const PAYMENT_LINK_BASE_URL = 'localhost:3000/pay';
