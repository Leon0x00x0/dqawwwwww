"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { createToken } from "@/lib/createToken";

export default function TokenCreationForm() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(6);
  const [supply, setSupply] = useState(1000000);
  const [rugpull, setRugpull] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mintAddr, setMintAddr] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!publicKey) return alert("Bitte Wallet verbinden!");
    setLoading(true);
    try {
      const pubkey = await createToken(connection, publicKey, sendTransaction, name, symbol, decimals, supply, rugpull);
      setMintAddr(pubkey.toBase58());
    } catch (e) {
      console.error(e);
      alert("Fehler beim Erstellen");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-2xl max-w-md mx-auto space-y-4 shadow-lg">
      <input
        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Decimals"
        type="number"
        value={decimals}
        onChange={(e) => setDecimals(Number(e.target.value))}
      />
      <input
        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Supply"
        type="number"
        value={supply}
        onChange={(e) => setSupply(Number(e.target.value))}
      />

      <label className="flex items-center space-x-2 text-gray-300 mt-2">
        <input
          type="checkbox"
          checked={rugpull}
          onChange={(e) => setRugpull(e.target.checked)}
          className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
        />
        <span>Rugpull aktivieren</span>
      </label>

      <button
        className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "⏳ Erstelle..." : "🚀 Erstellen"}
      </button>

      {mintAddr && <p className="mt-4 text-green-400 text-sm break-words">Mint: {mintAddr}</p>}
    </div>
  );
}
