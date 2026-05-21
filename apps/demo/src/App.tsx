import { useEffect, useMemo, useState } from "react";
import { fallbackBundle } from "./fallbackBundle";
import { formatDateTime, shortHash } from "./format";
import { ProofObject } from "./ProofObject";
import { kindClasses, kindLabels, toneFor } from "./receiptMeta";
import type { ProofBundle } from "./types";

export function App() {
  const [bundle, setBundle] = useState<ProofBundle | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/proof-bundle.json")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: ProofBundle) => {
        if (!ignore) {
          setBundle(data);
          setActiveId(data.receipts[0]?.id ?? null);
        }
      })
      .catch(() => {
        if (!ignore) {
          setBundle(fallbackBundle);
          setActiveId(fallbackBundle.receipts[0]?.id ?? null);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const activeReceipt = useMemo(() => {
    return (
      bundle?.receipts.find((receipt) => receipt.id === activeId) ??
      bundle?.receipts[0] ??
      null
    );
  }, [activeId, bundle]);

  if (!bundle || !activeReceipt) {
    return <main className="app-shell loading">Loading proof bundle...</main>;
  }

  const generatedLabel = formatDateTime(bundle.generatedAt);
  const chainPublishTone = toneFor(bundle.chainPublish.status);

  return (
    <main className={`app-shell ${kindClasses[activeReceipt.kind] ?? ""}`}>
      <a className="skip-link" href="#ledger">
        Skip to receipt ledger
      </a>

      <section className="hero">
        <nav className="topbar" aria-label="Proof navigation">
          <a
            className="brand"
            href="#top"
            aria-label="Paid Receipt Publisher home"
          >
            Paid Receipt Publisher
          </a>
          <div className="topbar-actions">
            <a href="#ledger">Ledger</a>
            <a href="#proof">Proof</a>
            <a href="#commands">Commands</a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">OnchainOS-ready skill artifact</p>
            <h1>Agent commerce receipts that survive the dashboard.</h1>
            <p className="lede">
              Every autonomous payment, blocked spend, refund, swap route, and
              service result becomes a signed hash-chain entry, ready to anchor
              on X Layer when a wallet is authorized.
            </p>
            <div className="command-pill" id="commands">
              <span>Reproduce</span>
              <code>pnpm demo:proof &amp;&amp; pnpm test</code>
            </div>
            <p className="hero-meta">
              Bundle generated <strong>{generatedLabel}</strong> ·{" "}
              {bundle.receipts.length} receipts in chain · ed25519 signatures
              verified locally
            </p>
          </div>

          <ProofObject receipt={activeReceipt} root={bundle.chainRoot} />
        </div>
      </section>

      <ProofStatus bundle={bundle} chainPublishTone={chainPublishTone} />
      <ReceiptLedger
        bundle={bundle}
        activeId={activeReceipt.id}
        onSelect={setActiveId}
      />
      <ReadProof bundle={bundle} />

      <footer className="page-footer" aria-label="Bundle metadata">
        <div>
          <span className="label">Project</span>
          <strong>{bundle.project}</strong>
        </div>
        <div>
          <span className="label">Bundle generated</span>
          <strong>{generatedLabel}</strong>
        </div>
        <div>
          <span className="label">Receipts in chain</span>
          <strong>{bundle.receipts.length}</strong>
        </div>
      </footer>
    </main>
  );
}

function ProofStatus({
  bundle,
  chainPublishTone,
}: {
  bundle: ProofBundle;
  chainPublishTone: string;
}) {
  return (
    <section className="status-band" id="proof" aria-label="Proof status">
      <div>
        <span className="label">Local proof</span>
        <strong>
          <span className="status-pill tone-good">verified</span>
          <span className="status-meta">Signatures + hash chain</span>
        </strong>
        <p>
          ed25519 signatures + linked previous-hash across{" "}
          {bundle.receipts.length} receipts.
        </p>
      </div>
      <div>
        <span className="label">X Layer publish</span>
        <strong>
          <span className={`status-pill ${chainPublishTone}`}>
            {bundle.chainPublish.status}
          </span>
          <span className="status-meta">
            {bundle.chainPublish.network} · chain id{" "}
            {bundle.chainPublish.chainId}
          </span>
        </strong>
        {bundle.chainPublish.blocker ? (
          <p>{bundle.chainPublish.blocker}</p>
        ) : null}
        {bundle.chainPublish.contractAddress ? (
          <p>
            Contract <code>{bundle.chainPublish.contractAddress}</code>
          </p>
        ) : (
          <p className="muted">No contract address bound to this bundle yet.</p>
        )}
      </div>
      <div>
        <span className="label">Chain root</span>
        <strong>
          <code className="root-hash">{shortHash(bundle.chainRoot, 22)}</code>
        </strong>
        <p className="muted">Final receipt hash doubles as the bundle root.</p>
      </div>
    </section>
  );
}

function ReceiptLedger({
  bundle,
  activeId,
  onSelect,
}: {
  bundle: ProofBundle;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="ledger-section" id="ledger">
      <div className="section-heading">
        <p className="eyebrow">Receipt ledger</p>
        <h2>Five proof chapters, one verifiable chain.</h2>
        <p className="section-lede">
          Each row is a signed receipt linked to the previous one. Color tracks
          receipt kind; the status pill tracks whether the external action
          settled, is prepared, or is honestly blocked.
        </p>
      </div>
      <div className="receipt-list" role="tablist" aria-label="Receipts">
        {bundle.receipts.map((receipt, index) => {
          const tone = toneFor(receipt.externalAction.status);
          const isActive = receipt.id === activeId;
          return (
            <button
              className={`receipt-row ${kindClasses[receipt.kind] ?? ""}${
                isActive ? " active" : ""
              }`}
              key={receipt.id}
              onClick={() => onSelect(receipt.id)}
              role="tab"
              aria-selected={isActive}
            >
              <span className="receipt-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="receipt-kind">
                <span className="receipt-swatch" aria-hidden="true" />
                {kindLabels[receipt.kind] ?? receipt.kind}
              </span>
              <code className="receipt-hash">
                {shortHash(receipt.receiptHash, 18)}
              </code>
              <span className="receipt-meta">
                <span className={`status-pill ${tone}`}>
                  {receipt.externalAction.status}
                </span>
                <span className="receipt-network">{receipt.network}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ReadProof({ bundle }: { bundle: ProofBundle }) {
  return (
    <section className="read-proof">
      <div className="section-heading">
        <p className="eyebrow">Live read evidence</p>
        <h2>Read access to X Layer is proven; writes require authorization.</h2>
        <p className="section-lede">
          Raw <code>cast</code> output captured against public RPCs. These
          commands are reproducible without any wallet.
        </p>
      </div>
      <div className="proof-lines">
        {bundle.liveReadProof.length === 0 ? (
          <p className="muted">No live read proofs captured in this bundle.</p>
        ) : (
          bundle.liveReadProof.map((proof) => (
            <div className="proof-line" key={proof.command}>
              <code className="proof-cmd">{proof.command}</code>
              <div className="proof-line-value">
                <strong>{proof.result}</strong>
                <span className="muted">
                  observed {formatDateTime(proof.observedAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
