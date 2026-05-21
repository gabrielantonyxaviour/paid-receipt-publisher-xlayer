import { formatDateTime, shortHash } from "./format";
import { kindBlurb, kindLabels, toneFor } from "./receiptMeta";
import type { Receipt } from "./types";

type ProofObjectProps = {
  receipt: Receipt;
  root: string;
};

export function ProofObject({ receipt, root }: ProofObjectProps) {
  const actionTone = toneFor(receipt.externalAction.status);
  const blurb = kindBlurb[receipt.kind];
  const sigScheme = receipt.signature?.scheme;

  return (
    <article className="proof-object" aria-label={`Receipt ${receipt.id}`}>
      <div className="proof-cover">
        <span className="proof-cover-kind">
          {kindLabels[receipt.kind] ?? receipt.kind}
        </span>
        <strong>{receipt.id}</strong>
        <span className="proof-cover-foot">
          <span className="dot" aria-hidden="true" />
          {receipt.network}
        </span>
      </div>
      <div className="proof-body">
        <p className="proof-memo">{receipt.memo}</p>
        {blurb ? <p className="proof-blurb">{blurb}</p> : null}

        <dl>
          <div>
            <dt>Agent</dt>
            <dd>{receipt.agent}</dd>
          </div>
          <div>
            <dt>Counterparty</dt>
            <dd>{receipt.counterparty}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd>
              {receipt.amount} <span className="asset">{receipt.asset}</span>
            </dd>
          </div>
          <div>
            <dt>Policy</dt>
            <dd>{receipt.policy}</dd>
          </div>
        </dl>

        <div className="action-panel" aria-label="External action">
          <div className="action-head">
            <span className="label">External action</span>
            <span className={`status-pill ${actionTone}`}>
              {receipt.externalAction.status}
            </span>
          </div>
          <p className="action-label">{receipt.externalAction.label}</p>
          <ExternalActionLink receipt={receipt} />
          {receipt.externalAction.blocker ? (
            <p className="action-blocker">{receipt.externalAction.blocker}</p>
          ) : null}
        </div>

        <div className="hash-stack">
          <span>Receipt hash</span>
          <code>{receipt.receiptHash}</code>
          <span>Previous hash</span>
          <code>{shortHash(receipt.previousHash, 26)}</code>
          <span>Current chain root</span>
          <code>{shortHash(root, 26)}</code>
        </div>

        {sigScheme ? (
          <p className="sig-tag">
            <span className="sig-dot" aria-hidden="true" />
            Signed locally with <strong>{sigScheme}</strong>
            {receipt.timestamp ? (
              <>
                {" · "}
                <span className="muted">
                  {formatDateTime(receipt.timestamp)}
                </span>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ExternalActionLink({ receipt }: { receipt: Receipt }) {
  if (receipt.externalAction.txHash) {
    return (
      <p className="action-line">
        <span className="muted">tx</span>{" "}
        {receipt.externalAction.url ? (
          <a
            href={receipt.externalAction.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>{shortHash(receipt.externalAction.txHash, 24)}</code>
          </a>
        ) : (
          <code>{shortHash(receipt.externalAction.txHash, 24)}</code>
        )}
      </p>
    );
  }

  if (!receipt.externalAction.url) return null;

  return (
    <p className="action-line">
      <span className="muted">artifact</span>{" "}
      <code>{receipt.externalAction.url}</code>
    </p>
  );
}
