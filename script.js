import axios from 'axios';

export const chains = [
  {
    key: 'eth',
    chainType: 'EVM',
    name: 'Ethereum',
    coin: 'ETH',
    id: 1,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
    tokenlistUrl: 'https://gateway.ipfs.io/ipns/tokens.uniswap.org',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0x1',
      blockExplorerUrls: ['https://etherscan.io/'],
      chainName: 'Ethereum Mainnet',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimals: 18,
      chainId: 1,
      name: 'ETH',
      coinKey: 'ETH',
      priceUSD: '1269.6',
      logoURI:
        'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
    },
  },
  {
    key: 'pol',
    chainType: 'EVM',
    name: 'Polygon',
    coin: 'MATIC',
    id: 137,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
    tokenlistUrl:
      'https://unpkg.com/quickswap-default-token-list@1.0.71/build/quickswap-default.tokenlist.json',
    faucetUrls: ['https://stakely.io/faucet/polygon-matic'],
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0x89',
      blockExplorerUrls: [
        'https://polygonscan.com/',
        'https://explorer-mainnet.maticvigil.com/',
      ],
      chainName: 'Matic(Polygon) Mainnet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      rpcUrls: [
        'https://polygon-rpc.com/',
        'https://rpc-mainnet.maticvigil.com/',
      ],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'MATIC',
      decimals: 18,
      chainId: 137,
      name: 'MATIC',
      coinKey: 'MATIC',
      priceUSD: '0.923004',
      logoURI:
        'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
    },
  },
  {
    key: 'bsc',
    chainType: 'EVM',
    name: 'BSC',
    coin: 'BNB',
    id: 56,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bsc.svg',
    tokenlistUrl:
      'https://tokens.pancakeswap.finance/pancakeswap-extended.json',
    faucetUrls: ['https://stakely.io/faucet/bsc-chain-bnb'],
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0x38',
      blockExplorerUrls: ['https://bscscan.com/'],
      chainName: 'Binance Smart Chain Mainnet',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      rpcUrls: [
        'https://bsc-dataseed.binance.org/',
        'https://bsc-dataseed1.defibit.io/',
        'https://bsc-dataseed1.ninicoin.io/',
      ],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'BNB',
      decimals: 18,
      chainId: 56,
      name: 'BNB',
      coinKey: 'BNB',
      priceUSD: '291.3',
      logoURI:
        'https://static.debank.com/image/bsc_token/logo_url/bsc/8bfdeaa46fe9be8f5cd43a53b8d1eea1.png',
    },
  },
  {
    key: 'ftm',
    chainType: 'EVM',
    name: 'Fantom',
    coin: 'FTM',
    id: 250,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/fantom.svg',
    tokenlistUrl:
      'https://raw.githubusercontent.com/SpookySwap/spooky-info/master/src/constants/token/spookyswap.json',
    faucetUrls: [
      'https://stakely.io/faucet/fantom-blockchain-ftm',
      'https://docs.spookyswap.finance/getting-started/how-to-get-fantom-gas',
    ],
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0xfa',
      blockExplorerUrls: ['https://ftmscan.com/'],
      chainName: 'Fantom Opera',
      nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
      rpcUrls: ['https://rpc.ftm.tools/', 'https://rpcapi.fantom.network'],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'FTM',
      decimals: 18,
      chainId: 250,
      name: 'FTM',
      coinKey: 'FTM',
      priceUSD: '0.2535',
      logoURI:
        'https://static.debank.com/image/ftm_token/logo_url/ftm/33fdb9c5067e94f3a1b9e78f6fa86984.png',
    },
  },
  {
    key: 'ava',
    chainType: 'EVM',
    name: 'Avalanche',
    coin: 'AVAX',
    id: 43114,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/avalanche.svg',
    tokenlistUrl:
      'https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/avalanche.json',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0xa86a',
      blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
      chainName: 'Avalanche Mainnet',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'AVAX',
      decimals: 18,
      chainId: 43114,
      name: 'Avalanche',
      coinKey: 'AVAX',
      priceUSD: '13.55',
      logoURI:
        'https://static.debank.com/image/avax_token/logo_url/avax/0b9c84359c84d6bdd5bfda9c2d4c4a82.png',
    },
  },
  {
    key: 'arb',
    chainType: 'EVM',
    name: 'Arbitrum',
    coin: 'ETH',
    id: 42161,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
    tokenlistUrl:
      'https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/arbitrum.json',
    faucetUrls: ['https://bridge.arbitrum.io/'],
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0xa4b1',
      blockExplorerUrls: ['https://arbiscan.io/'],
      chainName: 'Arbitrum',
      nativeCurrency: { name: 'AETH', symbol: 'AETH', decimals: 18 },
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimals: 18,
      chainId: 42161,
      name: 'ETH',
      coinKey: 'ETH',
      priceUSD: '1269.6',
      logoURI:
        'https://static.debank.com/image/arb_token/logo_url/arb/d61441782d4a08a7479d54aea211679e.png',
    },
  },
  {
    key: 'opt',
    chainType: 'EVM',
    name: 'Optimism',
    coin: 'ETH',
    id: 10,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/optimism.svg',
    tokenlistUrl: 'https://static.optimism.io/optimism.tokenlist.json',
    faucetUrls: ['https://gateway.optimism.io/'],
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0xa',
      blockExplorerUrls: ['https://optimistic.etherscan.io/'],
      chainName: 'Optimism',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.optimism.io/'],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimals: 18,
      chainId: 10,
      name: 'ETH',
      coinKey: 'ETH',
      priceUSD: '1269.6',
      logoURI:
        'https://static.debank.com/image/op_token/logo_url/op/d61441782d4a08a7479d54aea211679e.png',
    },
  },
  {
    key: 'cro',
    chainType: 'EVM',
    name: 'Cronos',
    coin: 'CRO',
    id: 25,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/cronos.svg',
    tokenlistUrl:
      'https://raw.githubusercontent.com/cronaswap/cronaswap-tokenlists/main/cronaswap-default.tokenlist.json',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0x19',
      blockExplorerUrls: ['https://cronos.crypto.org/explorer/'],
      chainName: 'Cronos',
      nativeCurrency: { name: 'Crypto.org Coin', symbol: 'CRO', decimals: 18 },
      rpcUrls: ['https://evm-cronos.crypto.org'],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'CRO',
      decimals: 18,
      chainId: 25,
      name: 'CRO',
      coinKey: 'CRO',
      priceUSD: '0.06441',
      logoURI:
        'https://static.debank.com/image/cro_token/logo_url/cro/affddd53019ffb9dbad0c724e12500c0.png',
    },
  },
  {
    key: 'aur',
    chainType: 'EVM',
    name: 'Aurora',
    coin: 'ETH',
    id: 1313161554,
    mainnet: true,
    logoURI:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/aurora.png',
    tokenlistUrl: 'https://aurora.dev/tokens.json',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    metamask: {
      chainId: '0x4e454152',
      blockExplorerUrls: ['https://aurorascan.dev/'],
      chainName: 'Aurora',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.aurora.dev'],
    },
    nativeToken: {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'AETH',
      decimals: 18,
      chainId: 1313161554,
      name: 'AETH',
      coinKey: 'ETH',
      priceUSD: '1269.26',
      logoURI:
        'https://static.debank.com/image/aurora_token/logo_url/aurora/d61441782d4a08a7479d54aea211679e.png',
    },
  },
];

const ids = chains.map((chain) => chain.id);

const main = async () => {
  const { tokens } = axios.get('https://li.quest/v1/tokens');
};