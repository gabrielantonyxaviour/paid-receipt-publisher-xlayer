# Current Spec - Paid Receipt Publisher

## Goal
Build `Paid Receipt Publisher` as a real X Layer / OnchainOS Skills Arena artifact: an installable receipt-publishing package, an onchain `ReceiptRegistry` contract, a deterministic proof-bundle generator, and a polished local demo UI.

## Decided
- Primary owner is Gabriel: Chrome dir `Default`, Chrome profile `Gabriel`, email `gabrielantony56@gmail.com`, GitHub `gabrielantonyxaviour`.
- Do not generate a MeDo app. Interpret plugin/backend planning as OKX OnchainOS plugin store, x402/Agent Payments Protocol, Uniswap/OKX DEX skills, X Layer contracts, public repo/demo, and local scaffolding.
- UI direction is Brutalist Editorial / Stripe Press-inspired proof carousel: each receipt type becomes a full-screen proof object, not a plain CRUD dashboard.
- Live X Layer read RPC works as of 2026-05-21: testnet chain id `1952`, testnet block `30864734`; mainnet chain id `196`.

## Open
- No OKX wallet/API key/private key is available in this session, so live publish/deploy transactions must remain blocked until Gabriel provides or authorizes a funded wallet path.
- Moltbook BuildX page is reachable but Gabriel profile is not logged in there; submission prefill is blocked without login.
- Official OKX Build X public page appears ended for the April 1-15, 2026 round unless a reopened portal proves otherwise.

## Out Of Scope
- Final submission, legal attestations, social posting, paid x402 requests, wallet connection, key generation, and faucet claiming without explicit approval.
- MeDo app generation or MeDo backend enablement.

## Done When
- Planning docs exist: `TEAM.md`, `BUILD_PLAN.md`, `PLUGIN_PLAN.md`, `BACKEND_PLAN.md`, `UI_TEMPLATE_PLAN.md`, `REPO_PLAN.md`, `SUBMISSION_PORTAL_PLAN.md`, and `EXECUTION_PACKET.md`.
- Code builds and tests pass for the TypeScript skill package, proof generator, demo app, and Solidity contract.
- The demo app renders with local proof bundle evidence and labels live-chain publishing honestly as blocked when no transaction hash exists.

## Archived Outcome
- Archived on 2026-05-21 after repo push and GitHub Pages deployment.
- Public repo: `https://github.com/gabrielantonyxaviour/paid-receipt-publisher-xlayer`
- Public demo: `https://gabrielantonyxaviour.github.io/paid-receipt-publisher-xlayer/`
