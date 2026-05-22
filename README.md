# X Cup Proof Receipts

A World Cup receipt rail for the OKX X Layer X Cup hackathon.

X Cup Proof Receipts turns prediction stakes, match hedges, denied risky bets, refunds, and settlement results into signed, hash-chained receipt records. The proof bundle can be inspected locally and anchored through the included X Layer `ReceiptRegistry` contract when a funded wallet is authorized.

## X Cup Fit

- World Cup theme: every record is a match-day receipt for prediction markets, trading hedges, fan-agent policy denials, refunds, or settlement proof.
- Built on X Layer: the receipt registry contract and proof bundle are prepared for X Layer testnet/mainnet anchoring.
- Completion and on-chain verifiability: signatures, previous-hash links, live X Layer RPC reads, and optional `ReceiptRegistry` publish path are included.
- Honest execution: no live write is claimed until a funded deployer, approved wallet, or transaction hash exists.

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

Public demo:

```bash
https://joshvajeskins.github.io/paid-receipt-publisher-xlayer/
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
4. Publish World Cup receipt hashes to X Layer only after wallet authorization exists.

The committed sample proof bundle lives in `examples/`; fresh local runs write current proof output to `outputs/` and `apps/demo/public/`.

## Honest Blockers

- No live X Layer write transaction has been made in this run.
- No live x402 payment or OKX DEX swap is claimed.
- Final X Cup form submission, social post, wallet connection, faucet claim, and legal attestation are pending explicit approval.
