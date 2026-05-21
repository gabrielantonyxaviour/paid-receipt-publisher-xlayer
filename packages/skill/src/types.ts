export type ReceiptKind = "payment" | "swap" | "denial" | "refund" | "service_result";

export type ExternalActionStatus = "observed" | "prepared" | "blocked" | "settled";

export interface ReceiptInput {
  id: string;
  kind: ReceiptKind;
  agent: string;
  counterparty: string;
  amount: string;
  asset: string;
  network: string;
  policy: string;
  memo: string;
  timestamp: string;
  externalAction: {
    label: string;
    status: ExternalActionStatus;
    txHash?: string | null;
    url?: string | null;
    blocker?: string | null;
  };
}

export interface Receipt extends ReceiptInput {
  previousHash: string;
  receiptHash: string;
  signature: {
    scheme: "ed25519";
    publicKeyPem: string;
    valueBase64: string;
  };
}

export interface ChainPublishStatus {
  status: "ready" | "blocked" | "published";
  network: string;
  chainId: number;
  contractAddress?: string | null;
  txHash?: string | null;
  explorerUrl?: string | null;
  blocker?: string | null;
}

export interface ProofBundle {
  generatedAt: string;
  project: string;
  chainRoot: string;
  receipts: Receipt[];
  chainPublish: ChainPublishStatus;
  liveReadProof: Array<{
    command: string;
    result: string;
    observedAt: string;
  }>;
}
