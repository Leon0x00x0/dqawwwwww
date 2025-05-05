"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletConnect() {
  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton className="glow-button" />
    </div>
  );
}
