import { createHash, generateKeyPairSync, sign, verify } from "node:crypto";
import { canonicalize } from "./canonical.js";
import type { Receipt, ReceiptInput, ReceiptKind } from "./types.js";

const ZERO_HASH = `0x${"0".repeat(64)}`;
const RECEIPT_KINDS = new Set<ReceiptKind>([
  "payment",
  "swap",
  "denial",
  "refund",
  "service_result",
]);

export function createSigner() {
  return generateKeyPairSync("ed25519");
}

export function hashPayload(payload: unknown): string {
  return `0x${createHash("sha256").update(canonicalize(payload)).digest("hex")}`;
}

export function createReceipt(
  input: ReceiptInput,
  previousHash = ZERO_HASH,
  signer = createSigner(),
): Receipt {
  validateReceiptInput(input);
  assertHash(previousHash, "previousHash");

  const unsignedReceipt = { ...input, previousHash };
  const receiptHash = hashPayload(unsignedReceipt);
  const message = Buffer.from(canonicalize(unsignedReceipt));
  const valueBase64 = sign(null, message, signer.privateKey).toString("base64");
  const publicKeyPem = signer.publicKey.export({ format: "pem", type: "spki" }).toString();

  return {
    ...unsignedReceipt,
    receiptHash,
    signature: {
      scheme: "ed25519",
      publicKeyPem,
      valueBase64,
    },
  };
}

export function appendReceipts(inputs: ReceiptInput[]): Receipt[] {
  const signer = createSigner();
  return inputs.reduce<Receipt[]>((receipts, input) => {
    const previousHash = receipts.at(-1)?.receiptHash ?? ZERO_HASH;
    receipts.push(createReceipt(input, previousHash, signer));
    return receipts;
  }, []);
}

export function verifyReceipt(receipt: Receipt): boolean {
  const { receiptHash, signature, ...unsignedReceipt } = receipt;
  if (hashPayload(unsignedReceipt) !== receiptHash) {
    return false;
  }

  return verify(
    null,
    Buffer.from(canonicalize(unsignedReceipt)),
    signature.publicKeyPem,
    Buffer.from(signature.valueBase64, "base64"),
  );
}

export function verifyHashChain(receipts: Receipt[]): boolean {
  return receipts.every((receipt, index) => {
    const expectedPrevious = index === 0 ? ZERO_HASH : receipts[index - 1].receiptHash;
    return receipt.previousHash === expectedPrevious && verifyReceipt(receipt);
  });
}

export function zeroHash() {
  return ZERO_HASH;
}

function validateReceiptInput(input: ReceiptInput) {
  const required: Array<keyof ReceiptInput> = [
    "id",
    "kind",
    "agent",
    "counterparty",
    "amount",
    "asset",
    "network",
    "policy",
    "memo",
    "timestamp",
    "externalAction",
  ];

  for (const field of required) {
    if (input[field] === undefined || input[field] === null || input[field] === "") {
      throw new Error(`Missing receipt field: ${field}`);
    }
  }

  if (!RECEIPT_KINDS.has(input.kind)) {
    throw new Error(`Unsupported receipt kind: ${input.kind}`);
  }

  if (Number.isNaN(Date.parse(input.timestamp))) {
    throw new Error(`Invalid timestamp: ${input.timestamp}`);
  }
}

function assertHash(value: string, label: string) {
  if (!/^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error(`${label} must be a 32-byte hex string`);
  }
}
