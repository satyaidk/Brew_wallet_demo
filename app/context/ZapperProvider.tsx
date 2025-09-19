"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginProvider";
import { mockTokenData, mockNFTData, mockDefiData, mockNetworks } from "../data/mockData";

// Define the types for the context
interface ZapperTokenDataTypes {
  address: string;
  symbol: string;
  name: string;
  balance: string;
  balanceUSD: number;
  network: string;
  logoURI: string;
}

interface ZapperNFTDataTypes {
  token: {
    name: string;
    tokenId: string;
    collection: {
      floorPriceEth: number;
    };
    medias: Array<{
      originalUrl: string;
    }>;
  };
}

interface ZapperDEFIDataTypes {
  appId: string;
  appName: string;
  balanceUSD: number;
  network: string;
  tokens: Array<{
    symbol: string;
    balance: string;
    balanceUSD: number;
  }>;
}

interface NetworkType {
  name: string;
  chainId: number;
}

interface ZapperContextProps {
  tokenData: ZapperTokenDataTypes[];
  NFTData: ZapperNFTDataTypes[];
  DefiData: ZapperDEFIDataTypes[];
  isZapperLoading: boolean;
  DefiTotal: number;
  totalBalance: number;
  selectedNetworks: NetworkType[];
  setSelectedNetworks: React.Dispatch<React.SetStateAction<NetworkType[]>>;
  tokensByNetwork: ZapperTokenDataTypes[];
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  tokenDataError: boolean;
  DeFiDataError: boolean;
  NftDataError: boolean;
  setIsZapperLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
export const ZapperContext = createContext<ZapperContextProps>({
  tokenData: [],
  NFTData: [],
  DefiData: [],
  isZapperLoading: true,
  DefiTotal: 0,
  totalBalance: 0,
  selectedNetworks: [],
  setSelectedNetworks: () => {},
  tokensByNetwork: [],
  refresh: false,
  setRefresh: () => {},
  tokenDataError: false,
  DeFiDataError: false,
  NftDataError: false,
  setIsZapperLoading: () => {},
});

// Create the provider component
export const ZapperProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [refresh, setRefresh] = useState(false);
  const { accountInfo } = useContext(LoginContext);

  const [tokenData, setTokenData] = useState<ZapperTokenDataTypes[] | any[]>(
    mockTokenData
  );
  const [NFTData, setNFTData] = useState<ZapperNFTDataTypes[] | any[]>(mockNFTData);
  const [DefiData, setDefiData] = useState<ZapperDEFIDataTypes[] | any[]>(mockDefiData);
  const [isZapperLoading, setIsZapperLoading] = useState(false);
  const [DefiTotal, setDefiTotal] = useState(4000); // Mock total
  const [totalBalance, setTotalBalance] = useState<number>(7750); // Mock total
  const [selectedNetworks, setSelectedNetworks] = useState<NetworkType[]>(mockNetworks);
  const [tokensByNetwork, setTokensByNetwork] = useState<ZapperTokenDataTypes[]>(mockTokenData);
  const [tokenDataError, setTokenDataError] = useState(false);
  const [DeFiDataError, setDeFiDataError] = useState(false);
  const [NftDataError, setNftDataError] = useState(false);

  // Simulate loading when refresh is triggered
  useEffect(() => {
    if (refresh) {
      setIsZapperLoading(true);
      setTimeout(() => {
        setIsZapperLoading(false);
        setRefresh(false);
      }, 1000);
    }
  }, [refresh]);

  return (
    <ZapperContext.Provider
      value={{
        tokenData: tokenData,
        NFTData: NFTData,
        DefiData: DefiData,
        isZapperLoading,
        DefiTotal,
        totalBalance,
        selectedNetworks,
        setSelectedNetworks,
        tokensByNetwork,
        refresh,
        setRefresh,
        tokenDataError,
        DeFiDataError,
        NftDataError,
        setIsZapperLoading,
      }}
    >
      {children}
    </ZapperContext.Provider>
  );
};

// Custom hook to use the login context
export const useZapperProvider = () => {
  return useContext(ZapperContext);
};