# Paid Receipt Publisher Proof Bundle

Generated: 2026-05-21T01:01:00.539Z
Chain root: `0x883cb3531eb4eae741eec31598f5a32298cfc2376c1798bc39807e6cea3faa28`
Publish status: blocked

## Receipts

### payment: rcpt-payment-001

- Agent: buyer.agent.gabriel
- Counterparty: research-skill.vendor
- Amount: 0.0100 USDC
- Policy: approved: under 0.05 USDC cap and known vendor
- External action: x402 service payment (prepared)
- Receipt hash: `0x47148c47386d0d3c93c6adc6ba48a4a33cd233efb7a569636d533cc79149689c`
- Previous hash: `0x0000000000000000000000000000000000000000000000000000000000000000`

### swap: rcpt-swap-001

- Agent: router.agent.gabriel
- Counterparty: okx-dex-route
- Amount: 0.0025 OKB
- Policy: blocked: no wallet approval for live DEX route
- External action: OKX DEX / Uniswap route (blocked)
- Receipt hash: `0xa52317f34f1cd000a8bd7b0c6689e0038f2dcb131204aecc2b8b53b28efa383e`
- Previous hash: `0x47148c47386d0d3c93c6adc6ba48a4a33cd233efb7a569636d533cc79149689c`

### denial: rcpt-denial-001

- Agent: policy.agent.gabriel
- Counterparty: unknown-skill.vendor
- Amount: 0.2500 USDC
- Policy: denied: exceeds skill spend cap and vendor is not allowlisted
- External action: policy gate (observed)
- Receipt hash: `0xc281a0efb2137c49718dca804c1c9f8acdc6364e6a4181649416bb60d8b08ba1`
- Previous hash: `0xa52317f34f1cd000a8bd7b0c6689e0038f2dcb131204aecc2b8b53b28efa383e`

### refund: rcpt-refund-001

- Agent: support.agent.gabriel
- Counterparty: research-skill.vendor
- Amount: 0.0100 USDC
- Policy: prepared: refund path available after failed SLA
- External action: refund transfer (prepared)
- Receipt hash: `0xbb468e85bb8634d0808e123329651cbf46dfed033640f2154345c80c243c0053`
- Previous hash: `0xc281a0efb2137c49718dca804c1c9f8acdc6364e6a4181649416bb60d8b08ba1`

### service_result: rcpt-result-001

- Agent: publisher.agent.gabriel
- Counterparty: judge.proof.reader
- Amount: 0 N/A
- Policy: settled-local: proof bundle generated and signature verified
- External action: proof bundle export (settled)
- Receipt hash: `0x883cb3531eb4eae741eec31598f5a32298cfc2376c1798bc39807e6cea3faa28`
- Previous hash: `0xbb468e85bb8634d0808e123329651cbf46dfed033640f2154345c80c243c0053`

## Live Read Proof

- `cast chain-id --rpc-url https://testrpc.xlayer.tech/terigon` -> `1952`
- `cast block-number --rpc-url https://testrpc.xlayer.tech/terigon` -> `30864734`
- `cast chain-id --rpc-url https://xlayerrpc.okx.com` -> `196`
