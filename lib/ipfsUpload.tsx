import { Web3Storage } from "web3.storage";

export async function ipfsUpload(data: object): Promise<string> {
  if (!process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN) {
    throw new Error("Web3.Storage Token fehlt.");
  }

  const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN });
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const file = new File([blob], "metadata.json");
  const cid = await client.put([file], { wrapWithDirectory: false });

  return `https://ipfs.io/ipfs/${cid}`;
}
