// Mock data for demo purposes
export const mockTokenData = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    name: "Ethereum",
    balance: "2.5",
    balanceUSD: 6250,
    network: "Ethereum",
    logoURI: "/tokens/ethereum.webp"
  },
  {
    address: "0xA0b86a33E6441b8c4C8C0E4A0b86a33E6441b8c4C",
    symbol: "USDC",
    name: "USD Coin",
    balance: "1000",
    balanceUSD: 1000,
    network: "Ethereum",
    logoURI: "/tokens/usdc.svg"
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    name: "Tether USD",
    balance: "500",
    balanceUSD: 500,
    network: "Ethereum",
    logoURI: "/tokens/usdt.png"
  }
];

export const mockNFTData = [
  {
    token: {
      name: "Cool NFT #1234",
      tokenId: "1234",
      collection: {
        floorPriceEth: 0.5
      },
      medias: [{
        originalUrl: "/nfts/NFT-Default.png"
      }]
    }
  },
  {
    token: {
      name: "Awesome NFT #5678",
      tokenId: "5678",
      collection: {
        floorPriceEth: 1.2
      },
      medias: [{
        originalUrl: "/nfts/NFT-Default.png"
      }]
    }
  }
];

export const mockDefiData = [
  {
    appId: "uniswap-v3",
    appName: "Uniswap V3",
    balanceUSD: 2500,
    network: "Ethereum",
    tokens: [
      {
        symbol: "ETH",
        balance: "1.0",
        balanceUSD: 2500
      }
    ]
  },
  {
    appId: "aave-v3",
    appName: "Aave V3",
    balanceUSD: 1500,
    network: "Ethereum",
    tokens: [
      {
        symbol: "USDC",
        balance: "1500",
        balanceUSD: 1500
      }
    ]
  }
];

export const mockNetworks = [
  { name: "Ethereum", chainId: 1 },
  { name: "Polygon", chainId: 137 },
  { name: "Base", chainId: 8453 },
  { name: "Arbitrum", chainId: 42161 }
];
