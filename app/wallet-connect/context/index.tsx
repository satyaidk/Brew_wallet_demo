// Simplified context for demo purposes - no WalletConnect

"use client";

import React, { ReactNode } from "react";

// Mock Web3Modal provider for demo
export default function Web3ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}