import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { appendReceipts, verifyHashChain } from "./receipts.js";
import type { ProofBundle, ReceiptInput } from "./types.js";

export function buildDemoProofBundle(now = new Date()): ProofBundle {
  const generatedAt = now.toISOString();
  const receipts = appendReceipts(seedReceipts(generatedAt));

  if (!verifyHashChain(receipts)) {
    throw new Error("Generated proof bundle failed hash-chain verification");
  }

  return {
    generatedAt,
    project: "X Cup Proof Receipts",
    chainRoot: receipts.at(-1)?.receiptHash ?? "",
    receipts,
    chainPublish: {
      status: "blocked",
      network: "xlayer-testnet",
      chainId: 1952,
      contractAddress: null,
      txHash: null,
      explorerUrl: null,
      blocker:
        "DEPLOYER_PRIVATE_KEY or Agentic Wallet authorization is required before anchoring World Cup receipt roots on X Layer.",
    },
    liveReadProof: [
      {
        command: "cast chain-id --rpc-url https://testrpc.xlayer.tech/terigon",
        result: "1952",
        observedAt: "2026-05-21T06:00:31+05:30",
      },
      {
        command:
          "cast block-number --rpc-url https://testrpc.xlayer.tech/terigon",
        result: "30864734",
        observedAt: "2026-05-21T06:00:31+05:30",
      },
      {
        command: "cast chain-id --rpc-url https://xlayerrpc.okx.com",
        result: "196",
        observedAt: "2026-05-21T06:00:31+05:30",
      },
    ],
  };
}

export function writeProofBundle(bundle: ProofBundle, path: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(bundle, null, 2)}\n`);
}

export function renderProofMarkdown(bundle: ProofBundle): string {
  const lines = [
    "# X Cup Proof Receipts Bundle",
    "",
    `Generated: ${bundle.generatedAt}`,
    `Chain root: \`${bundle.chainRoot}\``,
    `Publish status: ${bundle.chainPublish.status}`,
    "",
    "## Receipts",
    "",
    ...bundle.receipts.flatMap((receipt) => [
      `### ${receipt.kind}: ${receipt.id}`,
      "",
      `- Agent: ${receipt.agent}`,
      `- Counterparty: ${receipt.counterparty}`,
      `- Amount: ${receipt.amount} ${receipt.asset}`,
      `- Policy: ${receipt.policy}`,
      `- External action: ${receipt.externalAction.label} (${receipt.externalAction.status})`,
      `- Receipt hash: \`${receipt.receiptHash}\``,
      `- Previous hash: \`${receipt.previousHash}\``,
      "",
    ]),
    "## Live Read Proof",
    "",
    ...bundle.liveReadProof.map(
      (proof) => `- \`${proof.command}\` -> \`${proof.result}\``,
    ),
    "",
  ];

  return lines.join("\n");
}

function seedReceipts(timestamp: string): ReceiptInput[] {
  return [
    {
      id: "rcpt-payment-001",
      kind: "payment",
      agent: "prediction.agent.jeskins",
      counterparty: "argentina-france-market",
      amount: "0.0100",
      asset: "USDC",
      network: "xlayer-testnet",
      policy:
        "approved: stake is under fan-agent cap and market is allowlisted",
      memo: "World Cup prediction stake receipt for Argentina vs France regulation-time market.",
      timestamp,
      externalAction: {
        label: "prediction stake",
        status: "prepared",
        txHash: null,
        url: null,
        blocker:
          "No authorized X Layer deployer or fan wallet key in this session.",
      },
    },
    {
      id: "rcpt-swap-001",
      kind: "swap",
      agent: "odds-router.agent",
      counterparty: "okx-dex-match-hedge-route",
      amount: "0.0025",
      asset: "OKB",
      network: "xlayer-mainnet",
      policy: "blocked: no wallet approval for live match hedge route",
      memo: "Receipt records the intended World Cup odds hedge route without inventing a transaction.",
      timestamp,
      externalAction: {
        label: "World Cup hedge route",
        status: "blocked",
        txHash: null,
        url: null,
        blocker:
          "Connect wallet and approve route before publishing a hedge receipt.",
      },
    },
    {
      id: "rcpt-denial-001",
      kind: "denial",
      agent: "fairplay-policy.agent",
      counterparty: "unverified-match-tipster",
      amount: "0.2500",
      asset: "USDC",
      network: "xlayer-testnet",
      policy:
        "denied: exceeds match stake cap and tipster source is not allowlisted",
      memo: "Denial receipts make blocked World Cup fan-agent actions auditable.",
      timestamp,
      externalAction: {
        label: "fan-agent policy gate",
        status: "observed",
        txHash: null,
        url: null,
        blocker: null,
      },
    },
    {
      id: "rcpt-refund-001",
      kind: "refund",
      agent: "settlement.agent",
      counterparty: "rain-delay-void-market",
      amount: "0.0100",
      asset: "USDC",
      network: "xlayer-testnet",
      policy:
        "prepared: refund path available after voided or postponed match market",
      memo: "Refund receipt links World Cup settlement remediation to the same proof chain.",
      timestamp,
      externalAction: {
        label: "void-market refund",
        status: "prepared",
        txHash: null,
        url: null,
        blocker:
          "Refund publish awaits funded test wallet or approved Agentic Wallet session.",
      },
    },
    {
      id: "rcpt-result-001",
      kind: "service_result",
      agent: "receipt-publisher.agent",
      counterparty: "xcup-judge-proof-reader",
      amount: "0",
      asset: "N/A",
      network: "local-proof",
      policy: "settled-local: proof bundle generated and signature verified",
      memo: "Final receipt seals the World Cup proof bundle before optional X Layer anchoring.",
      timestamp,
      externalAction: {
        label: "proof bundle export",
        status: "settled",
        txHash: null,
        url: "outputs/proof-bundle.json",
        blocker: null,
      },
    },
  ];
}
