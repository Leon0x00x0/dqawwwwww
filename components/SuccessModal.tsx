"use client";

import { useState } from "react";

export function SuccessModal({ tokenAddress }: { tokenAddress: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://explorer.solana.com/address/${tokenAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 shadow-2xl animate-pulse">
      <h2 className="text-2xl font-bold mb-4">✅ Token Erfolgreich erstellt!</h2>
      <p className="text-sm break-words">{tokenAddress}</p>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href={`https://explorer.solana.com/address/${tokenAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-button text-center"
        >
          🔎 Auf Solana Explorer ansehen
        </a>
        <button className="glow-button" onClick={handleCopy}>
          {copied ? "✅ Link kopiert" : "📋 Link kopieren"}
        </button>
      </div>
    </div>
  );
}
