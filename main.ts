// One-Line Slogan for a Solana Wallet Agent
// Writes a single slogan (one line, <=20 words, <=140 chars) to /output/entry.txt.
// The slogan names the wallet, gives it hands (the agent doing the work),
// and states the promise in plain words: it pays, swaps, and stakes for you.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const SLOGAN =
  "Your Solana wallet, with hands: it pays, swaps, and stakes while you get on with your life.";

function main(): void {
  const outArg = process.argv[2];
  // argv[2] may be a file path or a directory; treat a trailing .txt as a file.
  const outDir = outArg ? resolve(outArg) : "/output";
  // Gate: single line, 1-140 chars, at most 20 words.
  if (SLOGAN.includes("\n") || SLOGAN.length < 1 || SLOGAN.length > 140) {
    throw new Error("slogan violates the gate");
  }
  const words = SLOGAN.trim().split(/\s+/);
  if (words.length > 20) throw new Error("slogan exceeds 20 words");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "entry.txt"), SLOGAN, "utf8");
  console.log(`wrote ${resolve(outDir, "entry.txt")} (${SLOGAN.length} characters)`);
}

main();
