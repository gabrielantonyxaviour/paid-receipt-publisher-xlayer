# Backend Plan

## Override Applied

No MeDo backend services will be enabled. The backend for this run is:

- local deterministic receipt/proof generation;
- a smart contract registry for durable X Layer anchors;
- optional future OnchainOS/x402/DEX adapters when credentials exist.

## Data Storage

Local proof bundle:

- `receipts[]`
  - `id`
  - `kind`: `payment | swap | denial | refund | service_result`
  - `agent`
  - `counterparty`
  - `amount`
  - `asset`
  - `network`
  - `policy`
  - `externalAction`
  - `timestamp`
  - `previousHash`
  - `receiptHash`
  - `signature`
  - `anchor`
- `chainRoot`
- `run`
- `publishStatus`

Onchain contract:

- `ReceiptRegistry.receipts[receiptHash]`
  - publisher
  - previousHash
  - uri
  - kind
  - publishedAt
  - revoked
- `latestHashByPublisher[publisher]`

## User Management

No login is required for the local demo. The judging path should be public and reproducible. Wallet identity is represented as an agent/publisher address when live publishing is enabled.

## Backend Functions

- Canonicalize receipt JSON.
- Hash each receipt and link it to the previous hash.
- Validate schema and hash-chain integrity.
- Generate proof bundle JSON and markdown.
- Publish receipt hash to `ReceiptRegistry` when a funded X Layer wallet exists.
- Generate explorer URLs from configured chain metadata.

## Secrets

No secret is committed. Optional runtime variables:

- `XLAYER_RPC_URL`
- `DEPLOYER_PRIVATE_KEY`
- `XLAYER_EXPLORER_BASE_URL`
- `OKX_ONCHAINOS_API_KEY`
- `X402_PRIVATE_KEY`

## Live Chain Status

Read-only X Layer access verified on 2026-05-21:

- Testnet RPC `https://testrpc.xlayer.tech/terigon`: `cast chain-id` returned `1952`; `cast block-number` returned `30864734`.
- Mainnet RPC `https://xlayerrpc.okx.com`: `cast chain-id` returned `196`.

Write/publish is blocked until a funded wallet or Agentic Wallet session is authorized.
