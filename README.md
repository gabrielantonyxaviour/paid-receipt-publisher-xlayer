# Paid Receipt Publisher

An OnchainOS-ready skill artifact for X Layer agent commerce.

Paid Receipt Publisher turns autonomous agent payments, swaps, denials, refunds, and service results into signed, hash-chained receipt records. The proof bundle can be inspected locally and anchored through the included X Layer `ReceiptRegistry` contract when a funded wallet is authorized.

## What Ships

- `packages/skill`: TypeScript receipt schema, signature generation, hash-chain validation, proof-bundle export, and CLI.
- `contracts`: Solidity `ReceiptRegistry` with Foundry tests.
- `apps/demo`: Vite + React proof dashboard using the generated receipt bundle.
- `examples/proof-bundle.md`: sample human-readable proof packet generated from the CLI.

## Quick Start

```bash
pnpm install
pnpm demo:proof
pnpm test
pnpm build
pnpm dev
```

Open the local app:

```bash
http://localhost:5179
```

## Live Chain Status

Read access to X Layer was verified on 2026-05-21:

- Testnet chain id: `1952`
- Testnet block observed: `30864734`
- Mainnet chain id: `196`

Write access is intentionally blocked until a funded wallet, Agentic Wallet session, or deployment key is explicitly supplied. This repo does not claim a live publish transaction until a transaction hash and explorer link are present.

## Optional X Layer Publish

```bash
XLAYER_RPC_URL=https://testrpc.xlayer.tech/terigon \
DEPLOYER_PRIVATE_KEY=... \
forge script contracts/script/DeployReceiptRegistry.s.sol --rpc-url "$XLAYER_RPC_URL" --broadcast
```

Do not commit private keys, API keys, wallet exports, or `.env` files.

## Demo Narrative

1. Generate a proof bundle with `pnpm demo:proof`.
2. Validate signatures and hash-chain integrity with `pnpm test`.
3. Inspect the proof dashboard at 375, 768, and 1440 widths.
4. Publish receipt hashes to X Layer only after wallet authorization exists.

The committed sample proof bundle lives in `examples/`; fresh local runs write current proof output to `outputs/` and `apps/demo/public/`.

## Honest Blockers

- No live X Layer write transaction has been made in this run.
- No live x402 payment or OKX DEX swap is claimed.
- The official Build X public page appears to describe an ended April 1-15, 2026 season unless a reopened portal proves otherwise.
- Moltbook BuildX rendered for the Gabriel profile but was not logged in, so no draft submission fields were prefilled.
