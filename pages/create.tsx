import Head from "next/head";
import TokenCreationForm from "@/components/TokenCreationForm";

export default function Create() {
  return (
    <>
      <Head><title>Create Token</title></Head>
      <div className="min-h-screen p-8 bg-darkbg text-white">
        <h2 className="text-3xl font-bold mb-6">Create New Meme Token</h2>
        <TokenCreationForm />
      </div>
    </>
  );
}
