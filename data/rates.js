const rates = {
  'ETH': 101000,
  'WETH': 101000,
  'USDC': 1,
  'USDT': 1,
  'CRO': 5.28,
  'FTM': 19.63,
  'MATIC': 74.42,
  'BNB': 23789,
  'WBTC': 1376040,
  'AVAX': 1110,
  'WBNB': 23789,
  'WMATIC': 74.42,
  'WFTM': 19.63,
  'AETH': 101000,
  'WSOL': 1095,
  'AURORA': 29.47,
}

export function convertFromTokenToToken(fromToken, toToken) {
  return (rates[fromToken]/rates[toToken]).toFixed(4)
}

// XDAI,  FUSDT