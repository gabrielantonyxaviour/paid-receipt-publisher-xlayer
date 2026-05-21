export const kindLabels: Record<string, string> = {
  payment: "Payment",
  swap: "Swap",
  denial: "Denial",
  refund: "Refund",
  service_result: "Service Result",
};

export const kindClasses: Record<string, string> = {
  payment: "theme-payment",
  swap: "theme-swap",
  denial: "theme-denial",
  refund: "theme-refund",
  service_result: "theme-result",
};

export const kindBlurb: Record<string, string> = {
  payment: "Authorized autonomous payment, hash-chained to the next receipt.",
  swap: "Routing intent recorded without inventing a transaction.",
  denial: "Policy gate caught the spend before it could leave the agent.",
  refund: "Post-service remediation linked to the originating payment.",
  service_result:
    "Sealed local proof bundle, ready for optional X Layer anchoring.",
};

const statusTone: Record<string, string> = {
  settled: "tone-good",
  verified: "tone-good",
  observed: "tone-good",
  prepared: "tone-warn",
  pending: "tone-warn",
  blocked: "tone-stop",
  denied: "tone-stop",
  failed: "tone-stop",
};

export function toneFor(value: string | null | undefined): string {
  if (!value) return "tone-neutral";
  return statusTone[value.toLowerCase()] ?? "tone-neutral";
}
