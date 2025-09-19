/* eslint-disable @next/next/no-img-element */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContext, useAccount } from "../context/LoginProvider";
import Truncate from "../utils/truncate";
import {
  Copy,
  PiggyBank,
  RefreshCcw,
  RefreshCcwIcon,
  SendHorizonal,
} from "lucide-react";
import { CopytoClipboard } from "../utils/copyclipboard";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ShowQR from "../components/QR/ShowQR";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import { formatNumberCommas } from "../utils/commas";
import PieChartComponent from "../components/PieChart/PieChart";
import { ZapperContext } from "../context/ZapperProvider";
import {
  getIconbySymbol,
  getNetworkLogobyName,
  Networks,
} from "../utils/Zapper";
import NumberTicker from "@/components/magicui/number-ticker";
import useAccountStore from "../store/account/account.store";
import { useRouter } from "next/navigation";

export default function App() {
  const { chainId, setChainId } = useAccountStore();
  const router = useRouter();
  const [tokenDetails, setTokenDetails]: any = useState([]);
  const [tokenVaultDetails, setTokenVaultDetails]: any = useState([]);

  const { toast } = useToast();
  const [openShowQR, setOpenShowQR] = useState(false);
  const { address } = useAccount();
  const { ensname, ensavatar } = useContext(LoginContext);

  //Zapper Data
  const {
    NFTData,
    DefiData,
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
  } = useContext(ZapperContext);

  useEffect(() => {
    addAllNetworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock token details for demo
  useEffect(() => {
    const mockTokens = [
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: "2.5",
        logoURI: "/tokens/ethereum.webp",
        address: "0x0000000000000000000000000000000000000000"
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: "1000",
        logoURI: "/tokens/usdc.svg",
        address: "0xA0b86a33E6441b8c4C8C0E4A0b86a33E6441b8c4C"
      }
    ];
    setTokenDetails(mockTokens);
  }, [chainId, address]);

  function addAllNetworks() {
    setSelectedNetworks((prevSelectedNetworks) => {
      const newSelectedNetworks = [...prevSelectedNetworks];

      Networks.forEach((network) => {
        if (!newSelectedNetworks.some((item) => item.name === network.name)) {
          newSelectedNetworks.push(network);
        }
      });

      return newSelectedNetworks;
    });
  }

  return (
    <div className=" flex flex-col items-start justify-center gap-6 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center relative">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <div className="text-2xl md:text-3xl font-bold">
                {ensname ? ensname : Truncate(address || "0x0000000000000000000000000000000000000000", 6)}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => CopytoClipboard(address || "0x0000000000000000000000000000000000000000", toast)}
                      className="p-1 hover:bg-accent rounded-md"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Address</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-sm text-muted-foreground">
              {ensavatar ? (
                <Image
                  src={ensavatar}
                  alt="ENS Avatar"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                "Demo Wallet"
              )}
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <Popover open={openShowQR} onOpenChange={setOpenShowQR}>
              <PopoverTrigger asChild>
                <button className="p-2 border border-accent rounded-md hover:bg-accent">
                  <SendHorizonal className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <ShowQR address={address || "0x0000000000000000000000000000000000000000"} />
              </PopoverContent>
            </Popover>

            <button
              onClick={() => setRefresh(true)}
              className="p-2 border border-accent rounded-md hover:bg-accent"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">Total Balance</div>
          <div className="text-3xl md:text-4xl font-bold">
            <NumberTicker value={totalBalance} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">DeFi Balance</div>
          <div className="text-xl md:text-2xl font-semibold">
            <NumberTicker value={DefiTotal} />
          </div>
        </div>
      </div>

      <div className="w-full border border-accent">
        <Tabs defaultValue="Tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Tokens">Tokens</TabsTrigger>
            <TabsTrigger value="DeFi">DeFi</TabsTrigger>
            <TabsTrigger value="NFTs">NFTs</TabsTrigger>
            <TabsTrigger value="Transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="Tokens" className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <PiggyBank className="w-5 h-5" />
                <div className="text-lg font-semibold">Your Tokens</div>
              </div>
              
              {isZapperLoading ? (
                <div className="flex justify-center items-center h-32">
                  <RefreshCcwIcon className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tokensByNetwork.map((token: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center p-4 border border-accent rounded-md"
                    >
                      <div className="flex flex-row gap-3 items-center">
                        <Image
                          src={getIconbySymbol(token.symbol) || "/tokens/default.png"}
                          alt={token.symbol}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <div className="font-semibold">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                      <div className="flex flex-col text-right">
                        <div className="font-semibold">{formatNumberCommas(token.balance)}</div>
                        <div className="text-sm text-muted-foreground">${formatNumberCommas(token.balanceUSD)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="DeFi" className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <PiggyBank className="w-5 h-5" />
                <div className="text-lg font-semibold">DeFi Positions</div>
              </div>
              
              {isZapperLoading ? (
                <div className="flex justify-center items-center h-32">
                  <RefreshCcwIcon className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DefiData.map((position: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center p-4 border border-accent rounded-md"
                    >
                      <div className="flex flex-col">
                        <div className="font-semibold">{position.appName}</div>
                        <div className="text-sm text-muted-foreground">{position.network}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${formatNumberCommas(position.balanceUSD)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="NFTs" className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <PiggyBank className="w-5 h-5" />
                <div className="text-lg font-semibold">Your NFTs</div>
              </div>
              
              {isZapperLoading ? (
                <div className="flex justify-center items-center h-32">
                  <RefreshCcwIcon className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {NFTData.map((nft: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between items-center gap-2"
                    >
                      <Image
                        className="w-full h-full"
                        src={nft.token.medias[0]?.originalUrl || "/nfts/NFT-Default.png"}
                        width={30}
                        height={30}
                        alt={nft.token.name}
                        unoptimized={true}
                      />
                      <div className="flex flex-row flex-wrap justify-between items-center w-full text-base md:text-lg">
                        <div className="flex flex-row gap-2 justify-start items-center">
                          <div className="line-clamp-1 w-24 truncate">
                            #{nft.token.tokenId}
                          </div>
                        </div>
                        <div className="text-base md:text-lg font-bold">
                          {nft.token.collection.floorPriceEth || 0} ETH
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="Transactions" className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <PiggyBank className="w-5 h-5" />
                <div className="text-lg font-semibold">Transaction History</div>
              </div>
              
              <div className="flex justify-center items-center h-32 text-muted-foreground">
                No transactions found
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}