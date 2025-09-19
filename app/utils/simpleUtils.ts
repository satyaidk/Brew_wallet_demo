// Simplified utility functions for demo purposes

export const fixDecimal = (value: string | number, decimals: number = 2): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toFixed(decimals);
};

export const formatNumberCommas = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const truncateAddress = (address: string, startLength: number = 6, endLength: number = 4): string => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const getTokenIcon = (symbol: string): string => {
  const iconMap: { [key: string]: string } = {
    'ETH': '/tokens/ethereum.webp',
    'USDC': '/tokens/usdc.svg',
    'USDT': '/tokens/usdt.png',
    'BTC': '/tokens/wbtc.svg',
    'MATIC': '/tokens/wmatic.png',
    'AVAX': '/tokens/avax.svg',
    'BNB': '/tokens/bnb.svg',
    'ARB': '/tokens/arb.svg',
    'OP': '/tokens/optimism.svg',
  };
  
  return iconMap[symbol] || '/tokens/default.png';
};

export const getNetworkIcon = (networkName: string): string => {
  const iconMap: { [key: string]: string } = {
    'Ethereum': '/chains/ethereum.webp',
    'Polygon': '/chains/polygon.svg',
    'Base': '/chains/base.svg',
    'Arbitrum': '/chains/arbitrum.svg',
    'Avalanche': '/chains/avalanche.svg',
    'BSC': '/chains/bsc.svg',
    'Optimism': '/chains/optimism.svg',
  };
  
  return iconMap[networkName] || '/chains/default.png';
};
