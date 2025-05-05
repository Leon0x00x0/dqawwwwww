import { Connection, PublicKey, Transaction, Keypair, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
} from "@solana/spl-token";

export async function createToken(
  connection: Connection,
  payer: PublicKey,
  sendTransaction: (tx: Transaction, conn: Connection) => Promise<string>,
  _name: string,
  _symbol: string,
  decimals: number,
  supply: number,
  rugpull: boolean
): Promise<PublicKey> {
  const mint = Keypair.generate();
  const rent = await connection.getMinimumBalanceForRentExemption(82);

  const tx1 = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint.publicKey,
      lamports: rent,
      space: 82,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(mint.publicKey, decimals, payer, rugpull ? payer : null)
  );
  tx1.feePayer = payer;
  tx1.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx1.partialSign(mint);
  await sendTransaction(tx1, connection);

  const ata = await getAssociatedTokenAddress(mint.publicKey, payer);
  const tx2 = new Transaction().add(
    createAssociatedTokenAccountInstruction(payer, ata, payer, mint.publicKey),
    createMintToInstruction(mint.publicKey, ata, payer, BigInt(supply) * BigInt(10 ** decimals))
  );
  if (!rugpull) {
    tx2.add(createSetAuthorityInstruction(mint.publicKey, payer, AuthorityType.MintTokens, null));
  }
  tx2.feePayer = payer;
  tx2.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  await sendTransaction(tx2, connection);

  return mint.publicKey;
}
