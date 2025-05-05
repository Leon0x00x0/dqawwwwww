import Head from "next/head";
import { LiquidityManager } from "@/components/LiquidityManager";

export default function Manage() {
  return (
    <>
      <Head><title>Manage Liquidity</title></Head>
      <div className="min-h-screen p-8 bg-darkbg text-white">
        <h2 className="text-3xl font-bold mb-6">Manage Liquidity Pools</h2>
        <LiquidityManager />
      </div>
    </>
  );
}
