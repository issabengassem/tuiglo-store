import { createHash } from "node:crypto";

/**
 * Deterministic per submissionToken: retrying the same client submission
 * (double-click, or a manual retry after a lost response, without editing
 * the form) always derives the same order ID instead of minting a new one.
 * That's what makes the duplicate check in lib/sheets/orders-sheet.ts work
 * without a database — see the Phase 1 report for the tradeoffs.
 */
export function generateOrderId(submissionToken: string, now: Date = new Date()): string {
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = createHash("sha256").update(submissionToken).digest("hex").slice(0, 5).toUpperCase();
  return `TG-${datePart}-${suffix}`;
}
