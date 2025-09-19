"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAccountStore from "../store/account/account.store";

interface LoginContextProps {
  status: "loading"| "ready" | "notready",
  walletInfo: any;
  accountInfo: any;
  setWalletInfo: (info: any) => void;
  setAccountInfo: (info: any) => void;
  ensname: any;
  ensavatar: any;
  validator: any;
}

// Create the context
export const LoginContext = createContext<LoginContextProps>({
  status: "notready",
  walletInfo: undefined,
  accountInfo: undefined,
  setWalletInfo: () => {},
  setAccountInfo: () => {},
  ensname: undefined,
  ensavatar: undefined,
  validator: undefined,
});

// Create the provider component
export const LoginProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();

  const { chainId } = useAccountStore();
  const [walletInfo, setWalletInfo] = useState<any>(undefined);
  const [walletStatus, setWalletStatus]= useState<"loading" | "ready" | "notready"> ("loading");
  const [accountInfo, setAccountInfo] = useState<any>(undefined);
  const [ensname, setEnsname] = useState<any>(undefined);
  const [ensavatar, setEnsavatar] = useState<any>(undefined);
  const [ validator, setValidator] = useState<any>(undefined);

  useEffect(() => {
    // Simulate loading for demo
    setTimeout(() => {
      setWalletStatus("notready");
    }, 1000);
  }, []);

  useEffect(() => {
    if (!walletInfo && pathname !== "/") {
      router.push("/");
    }
    if (walletInfo && pathname === "/") {
      router.push("/app");
    }
  }, [pathname, router, walletInfo, accountInfo]);

  return (
    <LoginContext.Provider
      value={{
        status: walletStatus,
        walletInfo,
        accountInfo,
        setWalletInfo,
        setAccountInfo,
        ensname,
        ensavatar,
        validator,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the login context
export const useLoginProvider = () => {
  return useContext(LoginContext);
};

// Export useAccount for compatibility
export const useAccount = () => {
  const { accountInfo } = useContext(LoginContext);
  return { 
    address: accountInfo?.address || "0x1234567890123456789012345678901234567890",
    isConnecting: false,
    isDisconnected: !accountInfo?.address
  };
};

// Export useWalletInfo for compatibility
export const useWalletInfo = () => {
  const { walletInfo, status } = useContext(LoginContext);
  return { walletInfo, status };
};

// Export useDisconnect for compatibility
export const useDisconnect = () => {
  const { setWalletInfo, setAccountInfo } = useContext(LoginContext);
  return {
    disconnect: () => {
      setWalletInfo(undefined);
      setAccountInfo(undefined);
    }
  };
};