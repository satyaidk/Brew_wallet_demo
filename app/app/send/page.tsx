"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Fuel, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import useAccountStore from "@/app/store/account/account.store";
import {
  LoginContext,
  useAccount,
  useLoginProvider,
} from "../../context/LoginProvider";
import { ZeroAddress, formatEther, parseEther, parseUnits } from "ethers";
import Truncate from "@/app/utils/truncate";
import LoadingIndicator from "@/components/ui/loader";

interface GasChainType {
  name: string;
  address: string;
  chainId: number;
  icon: string;
}

export default function Send() {
  const [selectedGasChain, setSelectedGasChain] = useState<GasChainType>({
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    icon: "/chains/ethereum.webp"
  });
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<any>({
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    balance: "2.5",
    logoURI: "/tokens/ethereum.webp"
  });

  const { chainId } = useAccountStore();
  const { address } = useAccount();

  const mockTokens = [
    {
      symbol: "ETH",
      name: "Ethereum",
      address: "0x0000000000000000000000000000000000000000",
      balance: "2.5",
      logoURI: "/tokens/ethereum.webp"
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      address: "0xA0b86a33E6441b8c4C8C0E4A0b86a33E6441b8c4C",
      balance: "1000",
      logoURI: "/tokens/usdc.svg"
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      balance: "500",
      logoURI: "/tokens/usdt.png"
    }
  ];

  const handleSend = async () => {
    if (!amount || !recipient) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Mock transaction for demo
    setTimeout(() => {
      alert(`Demo: Sending ${amount} ${selectedToken.symbol} to ${recipient}`);
      setIsLoading(false);
      setAmount("");
      setRecipient("");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="flex flex-row gap-2 items-center">
          <SendHorizonal className="w-5 h-5" />
          <div className="text-lg font-semibold">Send Tokens</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Select Token</label>
            <Select value={selectedToken.symbol} onValueChange={(value) => {
              const token = mockTokens.find(t => t.symbol === value);
              if (token) setSelectedToken(token);
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {mockTokens.map((token, index) => (
                  <SelectItem key={index} value={token.symbol}>
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        src={token.logoURI}
                        alt={token.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span>{token.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Amount</label>
            <div className="flex flex-row gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 px-3 py-2 border border-accent rounded-md bg-transparent"
              />
              <button
                onClick={() => setAmount(selectedToken.balance)}
                className="px-3 py-2 border border-accent rounded-md hover:bg-accent"
              >
                Max
              </button>
            </div>
            <div className="text-xs text-muted-foreground">
              Balance: {selectedToken.balance} {selectedToken.symbol}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="px-3 py-2 border border-accent rounded-md bg-transparent"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading || !amount || !recipient}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <LoadingIndicator text="Sending..." />
              </div>
            ) : (
              "Send Transaction"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}