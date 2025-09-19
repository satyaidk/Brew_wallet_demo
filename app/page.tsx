"use client";
import Image from "next/image";

import { LogOut, Wallet } from "lucide-react";
import Truncate from "./utils/truncate";
import { useState } from "react";
import {
  useLoginProvider,
  useWalletInfo,
  useAccount,
  useDisconnect,
} from "./context/LoginProvider";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Footer from "./components/Footer/Footer";
import LoadingIndicator from "@/components/ui/loader";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { setWalletInfo, setAccountInfo } = useLoginProvider();
  const { walletInfo, status } = useWalletInfo();
  const [connecting, setConnecting] = useState(false);

  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      setConnecting(true);
      // Simulate wallet connection for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set mock wallet info for demo
      setWalletInfo({ 
        name: "Demo Wallet", 
        icon: "/icons/wallet.svg" 
      });
      
      // Set mock account info
      setAccountInfo({
        address: "0x1234567890123456789012345678901234567890",
        isConnected: true,
      });
    } catch (e) {
      console.log(e);
    }
    setConnecting(false);
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16 justify-center items-center h-full text-center pt-12 md:pt-0 px-6">
      <div className="flex flex-col gap-20 items-center max-w-2xl">
        <div className="flex flex-row justify-center items-center gap-4 animate-pulse">
          <Image
            src={"/logo/icon.svg"}
            className="animate-pulse"
            alt="Brewit Logo"
            width={80}
            height={80}
          />
          <h1 className="font-black text-7xl md:block hidden">brewit</h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="font-black text-5xl md:text-6xl tracking-tight !leading-[1.1] bg-clip-text title-gradient text-transparent">
            Personal Barista for Your Crypto Journey
          </h2>
        </div>
      </div>

      <div className=" flex flex-col gap-4 items-center justify-center w-full max-w-sm text-lg">
        {!walletInfo && (
          <h2 className="text-white text-sm font-medium">
            Connect your wallet to get started
          </h2>
        )}
        <div className="flex flex-col gap-2 items-center justify-center w-full border border-accent rounded-md bg-black p-4 z-50">
          { status == "loading" ? (
              <LoadingIndicator text="Loading Brewit ..." color="#fff"/>
           
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <button
                className="flex font-bold flex-row gap-2 items-center justify-center border border-accent px-6 py-2.5 w-full button-gradient rounded-md"
                onClick={handleConnect}
              >
                { connecting ? <LoadingIndicator text="Connecting ..." image="/icons/wallet.svg" color="#000"/> :
                 <> <Image
                  src={"/icons/wallet.svg"}
                  alt="Wallet Icon"
                  width={25}
                  height={25}
                />
                <p className="font-bold text-black">Connect Wallet</p> </>}
              </button>
              
              <div className="text-sm text-muted-foreground">
                Demo Mode - No real wallet connection required
              </div>
            </div>
          )}
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] fill-neutral-400/80 z-0"
        )}
      />
      <Footer />
    </div>
  );
}