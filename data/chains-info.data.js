const EVM_CHAINS = {
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
};

export const chainMap = {
  1: { name: [EVM_CHAINS.ETHEREUM] },
  10: { name: [EVM_CHAINS.OPTIMISM] },
  42161: { name: [EVM_CHAINS.ARBITRUM] },
  137: { name: [EVM_CHAINS.POLYGON] },
  56: { name: [EVM_CHAINS.BNB] },
  250: { name: [EVM_CHAINS.FANTOM] },
  43114: { name: [EVM_CHAINS.AVALANCHE] },
  25: { name: [EVM_CHAINS.CRONOS] },
  1666600000: { name: [EVM_CHAINS.HARMONY] },
  2222: { name: [EVM_CHAINS.KAVA] },
  1313161554: { name: [EVM_CHAINS.AURORA] },
};

export const tokens = [
  {
    _id: '001',
    address: '0x0000000000000000000000000000000000000000',
    chainId: 1,
    symbol: 'ETH',
    decimals: 18,
    name: 'ETH',
    priceUSD: '1288.43',
    logoURI:
      'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
    coinKey: 'ETH',
  },
  {
    _id: '001',
    address: '0x0000000000000000000000000000000000000000',
    chainId: 5,
    symbol: 'ETH',
    decimals: 18,
    name: 'ETH',
    priceUSD: '1288.43',
    logoURI:
      'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
    coinKey: 'ETH',
  },
  {
    _id: '002',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 1,
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
    priceUSD: '1',
    logoURI:
      'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
    coinKey: 'USDC',
  },
  {
    _id: '003',
    address: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
    symbol: 'BNB',
    decimals: 18,
    chainId: 56,
    name: 'BNB',
    coinKey: 'BNB',
    priceUSD: '290.6',
    logoURI:
      'https://static.debank.com/image/bsc_token/logo_url/bsc/8bfdeaa46fe9be8f5cd43a53b8d1eea1.png',
  },
  {
    _id: '004',
    address: '0x0000000000000000000000000000000000001010',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 137,
    name: 'MATIC',
    coinKey: 'MATIC',
    priceUSD: '0.922687',
    logoURI:
      'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
  },
  {
    _id: '005',
    address: '0xC9c1c1c20B3658F8787CC2FD702267791f224Ce1',
    symbol: 'FTM',
    decimals: 18,
    chainId: 250,
    name: 'FTM',
    coinKey: 'FTM',
    priceUSD: '0.246',
    logoURI:
      'https://static.debank.com/image/ftm_token/logo_url/ftm/33fdb9c5067e94f3a1b9e78f6fa86984.png',
  },
  {
    _id: '006',
    address: '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79',
    symbol: 'Aurora',
    decimals: 18,
    chainId: 1313161554,
    name: 'Aurora',
    coinKey: 'Aurora',
    priceUSD: '0.3631900530607106',
    logoURI:
      'https://static.debank.com/image/aurora_token/logo_url/0x8bec47865ade3b172a928df8f990bc7f2a3b9f79/ec63b91b7247ce338caa842eb6439530.png',
  },
  {
    _id: '007',
    address: '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b',
    symbol: 'AVAX',
    decimals: 18,
    chainId: 43114,
    name: 'Avalanche',
    coinKey: 'AVAX',
    priceUSD: '13.36',
    logoURI:
      'https://static.debank.com/image/avax_token/logo_url/avax/0b9c84359c84d6bdd5bfda9c2d4c4a82.png',
  },
  {
    _id: '008',
    address: '0xAdA58DF0F643D959C2A47c9D4d4c1a4deFe3F11C',
    symbol: 'CRO',
    decimals: 18,
    chainId: 25,
    name: 'CRO',
    coinKey: 'CRO',
    priceUSD: '0.06434',
    logoURI:
      'https://static.debank.com/image/cro_token/logo_url/cro/affddd53019ffb9dbad0c724e12500c0.png',
  },
];
