export type ReceiptSignature = {
  scheme: string;
  publicKeyPem?: string;
  valueBase64?: string;
};

export type Receipt = {
  id: string;
  kind: string;
  agent: string;
  counterparty: string;
  amount: string;
  asset: string;
  network: string;
  policy: string;
  memo: string;
  timestamp?: string;
  previousHash: string;
  receiptHash: string;
  externalAction: {
    label: string;
    status: string;
    txHash?: string | null;
    url?: string | null;
    blocker?: string | null;
  };
  signature?: ReceiptSignature;
};

export type ProofBundle = {
  generatedAt: string;
  project: string;
  chainRoot: string;
  receipts: Receipt[];
  chainPublish: {
    status: string;
    network: string;
    chainId: number;
    contractAddress?: string | null;
    blocker?: string | null;
    txHash?: string | null;
    explorerUrl?: string | null;
  };
  liveReadProof: Array<{
    command: string;
    result: string;
    observedAt: string;
  }>;
};
