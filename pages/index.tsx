import Head from "next/head";
import WalletConnect from "@/components/WalletConnect";
import TokenCreationForm from "@/components/TokenCreationForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Solana Meme Coin Generator</title>
        <meta name="description" content="Create your meme coin on Solana" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent"></div>
        </div>

        <div className="z-10 relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-white drop-shadow-xl glow-text mb-6">
            🚀 Solana Meme Coin Generator
          </h1>

          <p className="text-center text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
            Erstelle in wenigen Sekunden deinen eigenen Meme-Token auf dem Solana-Mainnet – ganz ohne Code.
          </p>

          <div className="w-full max-w-2xl bg-gradient-to-tr from-purple-700/30 via-gray-800/40 to-purple-900/30 p-6 rounded-2xl border border-purple-800 shadow-2xl backdrop-blur-md">
            <WalletConnect />
            <div className="mt-6">
              <TokenCreationForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
