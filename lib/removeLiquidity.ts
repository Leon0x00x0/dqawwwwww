import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  WhirlpoolContext,
  decreaseLiquidityIx,
  PDAUtil,
  toUint128,
  ORCA_WHIRLPOOL_PROGRAM_ID,
} from "@raydium-io/raydium-sdk";

export async function removeLiquidity(
  connection: Connection,
  walletPubkey: PublicKey,
  poolAddress: PublicKey,
  positionMint: PublicKey,
  tokenOwnerAccountA: PublicKey,
  tokenOwnerAccountB: PublicKey,
  tickLower: number,
  tickUpper: number,
  liquidityToRemove: bigint
): Promise<Transaction> {
  // WhirlpoolContext statt WhirlpoolClient
  const ctx = WhirlpoolContext.withProvider(connection, ORCA_WHIRLPOOL_PROGRAM_ID);

  // Position PDA ermitteln
  const [positionAddress] = PDAUtil.getPosition(
    ORCA_WHIRLPOOL_PROGRAM_ID,
    poolAddress,
    walletPubkey,
    tickLower,
    tickUpper
  );

  // Nur decreaseLiquidityIx verwenden
  const ix1 = decreaseLiquidityIx({
    ctx,
    position: positionAddress,
    liquidityAmount: toUint128(liquidityToRemove),
  });

  const tx = new Transaction().add(ix1);
  tx.feePayer = walletPubkey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  return tx;
}
