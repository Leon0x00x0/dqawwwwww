import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  WhirlpoolContext,
  increaseLiquidityIx,
  PDAUtil,
  toUint128,
  ORCA_WHIRLPOOL_PROGRAM_ID,
} from "@raydium-io/raydium-sdk";

export async function addLiquidity(
  connection: Connection,
  walletPubkey: PublicKey,
  poolAddress: PublicKey,
  tokenAccountA: PublicKey,
  tokenAccountB: PublicKey,
  amountA: bigint,
  amountB: bigint,
  tickLower: number,
  tickUpper: number
): Promise<Transaction> {
  const ctx: WhirlpoolContext = {
    connection,
    programId: ORCA_WHIRLPOOL_PROGRAM_ID,
    poolConfig: { tickSpacing: tickUpper - tickLower },
  };

  // Position PDA ermitteln
  const [positionAddress] = PDAUtil.getPosition(
    ORCA_WHIRLPOOL_PROGRAM_ID,
    poolAddress,
    walletPubkey,
    tickLower,
    tickUpper
  );

  // Instruction
  const ix = increaseLiquidityIx({
    ctx,
    position: positionAddress,
    pool: poolAddress,
    wallet: walletPubkey,
    tokenOwnerAccountA: tokenAccountA,
    tokenOwnerAccountB: tokenAccountB,
    amountA: toUint128(amountA),
    amountB: toUint128(amountB),
    tickLower,
    tickUpper,
  });

  const tx = new Transaction().add(ix);
  tx.feePayer = walletPubkey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  return tx;
}
