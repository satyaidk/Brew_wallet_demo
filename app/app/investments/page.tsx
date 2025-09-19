"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  BadgeInfo,
  CalendarIcon,
  Ellipsis,
  PlusSquareIcon,
  Wallet2,
  TrendingUp,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import { useAccount, useLoginProvider } from "../../context/LoginProvider";
import useAccountStore from "@/app/store/account/account.store";
import { ZeroAddress, formatEther } from "ethers";
import { setHours, setMinutes } from "date-fns";
import moment from "moment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentCard } from "./InvestmentCard";
import LoadingIndicator from "@/components/ui/loader";

export default function Investments() {
  const [selectedToken, setSelectedToken] = useState<any>({
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    balance: "2.5",
    logoURI: "/tokens/ethereum.webp"
  });
  const [amount, setAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("daily");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);

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

  const mockVaults = [
    {
      name: "USDC Vault",
      symbol: "vUSDC",
      address: "0x1234567890123456789012345678901234567890",
      apy: "5.2%",
      tvl: "$2.5M",
      logoURI: "/tokens/usdc.svg"
    },
    {
      name: "ETH Vault",
      symbol: "vETH",
      address: "0x0987654321098765432109876543210987654321",
      apy: "3.8%",
      tvl: "$1.2M",
      logoURI: "/tokens/ethereum.webp"
    }
  ];

  const mockJobs = [
    {
      id: "job-1",
      token: "USDC",
      amount: "100",
      frequency: "daily",
      vault: "USDC Vault",
      status: "active",
      nextExecution: "2024-01-15T10:00:00Z",
      totalInvested: "500"
    },
    {
      id: "job-2", 
      token: "ETH",
      amount: "0.1",
      frequency: "weekly",
      vault: "ETH Vault",
      status: "active",
      nextExecution: "2024-01-20T14:00:00Z",
      totalInvested: "0.5"
    }
  ];

  useEffect(() => {
    setActiveJobs(mockJobs);
  }, []);

  const handleCreateInvestment = async () => {
    if (!amount || !selectedToken) {
      alert("Please fill in all fields");
      return;
    }

    setIsCreating(true);
    
    // Mock investment creation
    setTimeout(() => {
      const newJob = {
        id: `job-${Date.now()}`,
        token: selectedToken.symbol,
        amount: amount,
        frequency: frequency,
        vault: "Demo Vault",
        status: "active",
        nextExecution: startDate.toISOString(),
        totalInvested: amount
      };
      
      setActiveJobs([...activeJobs, newJob]);
      setIsCreating(false);
      setAmount("");
      alert("Demo: Investment strategy created successfully!");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="flex flex-row gap-2 items-center">
          <TrendingUp className="w-5 h-5" />
          <div className="text-lg font-semibold">Automated Investments</div>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Strategy</TabsTrigger>
            <TabsTrigger value="manage">Manage Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
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
                <label className="text-sm text-muted-foreground">Investment Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="px-3 py-2 border border-accent rounded-md bg-transparent"
                />
                <div className="text-xs text-muted-foreground">
                  Balance: {selectedToken.balance} {selectedToken.symbol}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">Frequency</label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="px-3 py-2 border border-accent rounded-md bg-transparent text-left">
                      {format(startDate, "PPP")}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <button
                onClick={handleCreateInvestment}
                disabled={isCreating || !amount}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <LoadingIndicator text="Creating..." />
                  </div>
                ) : (
                  "Create Investment Strategy"
                )}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeJobs.map((job, index) => (
                <InvestmentCard key={index} job={job} />
              ))}
            </div>
            
            {activeJobs.length === 0 && (
              <div className="flex justify-center items-center h-32 text-muted-foreground">
                No active investment strategies
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}