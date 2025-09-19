// Simplified tokens utility for demo purposes

export const gasChainsTokens = [
  {
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    icon: "/chains/ethereum.webp"
  },
  {
    name: "Polygon",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 137,
    icon: "/chains/polygon.svg"
  },
  {
    name: "Base",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 8453,
    icon: "/chains/base.svg"
  },
  {
    name: "Arbitrum",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 42161,
    icon: "/chains/arbitrum.svg"
  }
];

export const findChainIndexByChainId = (chainId: number): number => {
  return gasChainsTokens.findIndex(chain => chain.chainId === chainId);
};

export const getChainById = (chainId: number) => {
  return gasChainsTokens.find(chain => chain.chainId === chainId);
};

export const getTokenInfo = (chainId: number, tokenAddress: string) => {
  // Mock token info for demo
  const mockTokens: { [key: string]: any } = {
    "0x0000000000000000000000000000000000000000": {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      icon: "/tokens/ethereum.webp"
    },
    "0xA0b86a33E6441b8c4C8C0E4A0b86a33E6441b8c4C": {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      icon: "/tokens/usdc.svg"
    },
    "0xdAC17F958D2ee523a2206206994597C13D831ec7": {
      name: "Tether USD",
      symbol: "USDT",
      decimals: 6,
      icon: "/tokens/usdt.png"
    }
  };
  
  return mockTokens[tokenAddress] || {
    name: "Unknown Token",
    symbol: "UNK",
    decimals: 18,
    icon: "/tokens/default.png"
  };
};