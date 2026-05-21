# Execution Packet

## Project Name

Paid Receipt Publisher

## One-Line

An installable OnchainOS-ready skill that turns agent payments, swaps, denials, refunds, and service outputs into signed, hash-chained receipts that can be anchored on X Layer.

## README Spine

1. Problem: agents can spend, swap, deny, and refund autonomously, but judges and users need a compact proof trail.
2. Solution: a receipt schema, hash-chain, proof bundle, and X Layer anchor contract.
3. Install:

```bash
pnpm install
pnpm demo:proof
pnpm test
pnpm build
```

4. Live publish:

```bash
XLAYER_RPC_URL=https://testrpc.xlayer.tech/terigon \
DEPLOYER_PRIVATE_KEY=... \
pnpm anchor:xlayer
```

5. Honest status: local proof is reproducible; live X Layer writes need a funded wallet.

## Demo Script

1. Show the CLI generating a proof bundle.
2. Open the demo UI and point at the chain root digest.
3. Step through five receipt chapters: payment, swap, denial, refund, service result.
4. Show the Foundry test proving registry behavior.
5. Show the live X Layer read probe returning chain id `1952`.
6. State clearly that publishing is blocked until a wallet/API key is authorized.

## Video Script

"Autonomous agents are starting to pay for data, call skills, swap assets, and deny risky spends. The missing primitive is a receipt that another agent, a judge, or a human can verify without trusting the dashboard. Paid Receipt Publisher gives every action a canonical receipt, links it to the previous receipt, signs it, and anchors the digest on X Layer when a wallet is available. This demo shows the same package generating a proof bundle, validating the chain, rendering the judge-facing audit trail, and testing the X Layer registry contract. No transaction is claimed unless the repo contains the hash."

## Judging Criteria Mapping

- Technical novelty: reusable receipt skill plus onchain anchor contract.
- Protocol-native depth: X Layer chain metadata, Foundry deployment path, OnchainOS plugin-store packaging target.
- Demo clarity: one command generates the proof bundle and one UI shows every digest.
- Anti-generic differentiation: not an expense dashboard; it is a verifiable evidence primitive.
- Sponsor fit: supports x402/Agent Payments Protocol and agent-commerce auditability.

## Links

- GitHub: `https://github.com/gabrielantonyxaviour/paid-receipt-publisher-xlayer`
- Demo: `https://gabrielantonyxaviour.github.io/paid-receipt-publisher-xlayer/`
- OKX plugin page: `https://web3.okx.com/onchainos/plugins/detail/okx-buildx-hackathon-agent-track`
- X Layer testnet RPC proof: chain id `1952`, block `30864734`

## Final Checklist

- [x] Planning docs written
- [x] Contract implemented
- [x] Contract tests pass
- [x] Skill package implemented
- [x] Skill package tests pass
- [x] Proof bundle generated
- [x] Demo UI implemented
- [x] UI inspected at desktop/mobile
- [x] Public repo pushed
- [x] Submission portal status documented
- [x] Builder report written
