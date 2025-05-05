import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { ORCA_WHIRLPOOL_PROGRAM_ID, WhirlpoolContext, PDAUtil, createPoolIx } from "@orca-so/whirlpools-sdk";

export async function createLiquidityPool(
  connection: Connection,
  walletPubkey: PublicKey,
  tokenMintA: PublicKey,
  tokenMintB: PublicKey,
  tickSpacing: number,
  initSqrtPrice: number
): Promise<{ poolPubkey: PublicKey; tx: Transaction }> {
  const ctx: WhirlpoolContext = {
    connection,
    programId: ORCA_WHIRLPOOL_PROGRAM_ID,
    poolConfig: { tickSpacing },
  };

  // Pool PDA ermitteln
  const [poolPubkey, whirlpoolBump] = PDAUtil.getWhirlpool(
    ORCA_WHIRLPOOL_PROGRAM_ID,
    ORCA_WHIRLPOOL_PROGRAM_ID,
    tokenMintA,
    tokenMintB,
    tickSpacing
  );

  // Instruction
  const ix = createPoolIx({
    ctx,
    tokenMintA,
    tokenMintB,
    tickSpacing,
    owner: walletPubkey,
    rewardOwner: walletPubkey,
    whirlpoolBump,
    initSqrtPrice,
  });

  const tx = new Transaction().add(ix);
  tx.feePayer = walletPubkey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  return { poolPubkey, tx };
}
