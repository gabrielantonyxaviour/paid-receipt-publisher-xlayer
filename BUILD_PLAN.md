# Build Plan

## Product

`Paid Receipt Publisher` is an installable skill and proof dashboard for autonomous agents. It turns agent payments, swaps, denials, refunds, and service results into signed, hash-chained receipt records, then anchors those records through a small X Layer `ReceiptRegistry` contract when a funded wallet is available.

## Stack

- Smart contract: Solidity + Foundry, `ReceiptRegistry`.
- Skill package: TypeScript package `@paid-receipt/skill`, no production secrets, deterministic JSON canonicalization, receipt validation, chain hashing, proof-bundle export.
- CLI: `paid-receipt` with demo/hash/verify commands.
- Demo UI: Vite + React + TypeScript, local proof bundle loaded from a generated JSON file.
- Live chain tooling: `cast`/Foundry first, with future OnchainOS skill wrappers once wallet/API keys exist.

## App Scope

- Receipt schema covers `payment`, `swap`, `denial`, `refund`, and `service_result`.
- Proof bundle includes receipt hash, previous hash, chain root, signer/agent identity, policy decision, optional chain target, and publish status.
- Local demo generates an honest proof bundle and UI from the package output.
- Onchain anchor path is real contract + deployment script, but no live transaction will be claimed without a transaction hash.

## Demo Path

1. Run tests for receipt validation and hash chain.
2. Run Foundry tests for `ReceiptRegistry`.
3. Generate a proof bundle.
4. Open the demo UI and inspect receipt cards.
5. If `XLAYER_RPC_URL` and `DEPLOYER_PRIVATE_KEY` are supplied, deploy/anchor and attach explorer links; otherwise mark `chainPublish.status = blocked`.

## Plugin / Backend Choices

- Plugin path: OKX OnchainOS `okx-buildx-hackathon-agent-track` as the public plugin-store entry and install pattern.
- Payment path: x402/Agent Payments Protocol-ready receipt fields, but live x402 settlement is blocked without wallet/API credentials.
- DEX path: future OKX DEX or Uniswap route receipts are supported by schema; demo uses a blocked swap receipt rather than inventing a transaction.
- Backend path: local JSON proof store plus X Layer contract as durable backend. No MeDo backend.

## UI Direction

Use `10-stripe-press` inspiration: editorial proof objects, horizontal/sectional receipt presentation, per-receipt color systems, and a judge-first chain status panel. Avoid generic stat-card dashboard layout.

## Timeboxed Milestones

- M0: planning docs and blocker evidence.
- M1: contract + TypeScript skill package.
- M2: proof bundle generator + tests.
- M3: editorial demo UI + browser verification.
- M4: public repo push + submission packet.
