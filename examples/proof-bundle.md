# Paid Receipt Publisher Proof Bundle

Generated: 2026-05-21T01:05:23.643Z
Chain root: `0x100863767a2c8b6197554790568c81bab1e2b6344a0b646d8f9ddc8d4b350228`
Publish status: blocked

## Receipts

### payment: rcpt-payment-001

- Agent: buyer.agent.gabriel
- Counterparty: research-skill.vendor
- Amount: 0.0100 USDC
- Policy: approved: under 0.05 USDC cap and known vendor
- External action: x402 service payment (prepared)
- Receipt hash: `0xff3304b34d629358cf14e756d1efaa89df80f2533fcb392d409b4a1a1c717632`
- Previous hash: `0x0000000000000000000000000000000000000000000000000000000000000000`

### swap: rcpt-swap-001

- Agent: router.agent.gabriel
- Counterparty: okx-dex-route
- Amount: 0.0025 OKB
- Policy: blocked: no wallet approval for live DEX route
- External action: OKX DEX / Uniswap route (blocked)
- Receipt hash: `0xb01a211ca7160c1b25bd2bc1fea259f66ab2a78ca0fa3dfa6ff9c71429f67c75`
- Previous hash: `0xff3304b34d629358cf14e756d1efaa89df80f2533fcb392d409b4a1a1c717632`

### denial: rcpt-denial-001

- Agent: policy.agent.gabriel
- Counterparty: unknown-skill.vendor
- Amount: 0.2500 USDC
- Policy: denied: exceeds skill spend cap and vendor is not allowlisted
- External action: policy gate (observed)
- Receipt hash: `0x0ee94d1644aad52f078540ceed9bb86a7ef25dba6e3b34a31c74e25680a3b1fc`
- Previous hash: `0xb01a211ca7160c1b25bd2bc1fea259f66ab2a78ca0fa3dfa6ff9c71429f67c75`

### refund: rcpt-refund-001

- Agent: support.agent.gabriel
- Counterparty: research-skill.vendor
- Amount: 0.0100 USDC
- Policy: prepared: refund path available after failed SLA
- External action: refund transfer (prepared)
- Receipt hash: `0x9fc8ed05a2d73d29c8c3762e0b77dc52da2c26f4c8b5e9780f160d9e3d273013`
- Previous hash: `0x0ee94d1644aad52f078540ceed9bb86a7ef25dba6e3b34a31c74e25680a3b1fc`

### service_result: rcpt-result-001

- Agent: publisher.agent.gabriel
- Counterparty: judge.proof.reader
- Amount: 0 N/A
- Policy: settled-local: proof bundle generated and signature verified
- External action: proof bundle export (settled)
- Receipt hash: `0x100863767a2c8b6197554790568c81bab1e2b6344a0b646d8f9ddc8d4b350228`
- Previous hash: `0x9fc8ed05a2d73d29c8c3762e0b77dc52da2c26f4c8b5e9780f160d9e3d273013`

## Live Read Proof

- `cast chain-id --rpc-url https://testrpc.xlayer.tech/terigon` -> `1952`
- `cast block-number --rpc-url https://testrpc.xlayer.tech/terigon` -> `30864734`
- `cast chain-id --rpc-url https://xlayerrpc.okx.com` -> `196`
