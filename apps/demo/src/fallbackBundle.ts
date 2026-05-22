import type { ProofBundle } from "./types";

export const fallbackBundle: ProofBundle = {
  generatedAt: "2026-05-21T00:00:00.000Z",
  project: "X Cup Proof Receipts",
  chainRoot:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  receipts: [
    {
      id: "rcpt-fallback",
      kind: "service_result",
      agent: "receipt-publisher.agent",
      counterparty: "xcup-judge-proof-reader",
      amount: "0",
      asset: "N/A",
      network: "local-proof",
      policy: "fallback only",
      memo: "Run pnpm demo:proof to generate the real X Cup proof bundle.",
      previousHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      receiptHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      externalAction: {
        label: "fallback",
        status: "blocked",
        blocker:
          "X Cup proof bundle has not been generated. Run pnpm demo:proof.",
      },
    },
  ],
  chainPublish: {
    status: "blocked",
    network: "xlayer-testnet",
    chainId: 1952,
    blocker: "X Cup proof bundle has not been generated yet.",
  },
  liveReadProof: [],
};
