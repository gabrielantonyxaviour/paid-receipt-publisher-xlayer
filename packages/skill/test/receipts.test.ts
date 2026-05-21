import assert from "node:assert/strict";
import test from "node:test";
import { appendReceipts, createReceipt, verifyHashChain, verifyReceipt, zeroHash } from "../src/index.js";
import type { ReceiptInput } from "../src/index.js";

const baseInput: ReceiptInput = {
  id: "rcpt-test-001",
  kind: "payment",
  agent: "buyer.agent",
  counterparty: "seller.agent",
  amount: "0.0100",
  asset: "USDC",
  network: "xlayer-testnet",
  policy: "approved",
  memo: "test receipt",
  timestamp: "2026-05-21T00:00:00.000Z",
  externalAction: {
    label: "x402 service payment",
    status: "prepared",
    txHash: null,
    url: null,
    blocker: "wallet unavailable",
  },
};

test("creates and verifies a signed receipt", () => {
  const receipt = createReceipt(baseInput);

  assert.equal(receipt.previousHash, zeroHash());
  assert.match(receipt.receiptHash, /^0x[a-f0-9]{64}$/);
  assert.equal(verifyReceipt(receipt), true);
});

test("detects payload tampering", () => {
  const receipt = createReceipt(baseInput);
  const tampered = { ...receipt, amount: "99.0000" };

  assert.equal(verifyReceipt(tampered), false);
});

test("builds a valid hash chain", () => {
  const receipts = appendReceipts([
    baseInput,
    {
      ...baseInput,
      id: "rcpt-test-002",
      kind: "denial",
      policy: "denied",
      externalAction: { label: "policy gate", status: "observed" },
    },
  ]);

  assert.equal(receipts[1].previousHash, receipts[0].receiptHash);
  assert.equal(verifyHashChain(receipts), true);
});
