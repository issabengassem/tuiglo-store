import { createHash } from "node:crypto";

/**
 * Deterministic per submissionToken (when called without a salt): retrying
 * the same client submission (double-click, or a manual retry after a lost
 * response, without editing the form) always derives the same order ID
 * instead of minting a new one. That's what makes the duplicate check in
 * lib/sheets/orders-sheet.ts work without a database.
 *
 * The suffix is 8 hex chars (~32 bits of entropy per day) so an accidental
 * collision with a DIFFERENT order is vanishingly rare; if one is still
 * detected by the Sheets duplicate check, the route regenerates with a
 * random salt. Existing shorter IDs already stored in Google Sheets remain
 * valid — no migration.
 */
export function generateOrderId(submissionToken: string, now: Date = new Date(), salt = ""): string {
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const hashInput = salt ? `${salt}\n${submissionToken}` : submissionToken;
  const suffix = createHash("sha256").update(hashInput).digest("hex").slice(0, 8).toUpperCase();
  return `TG-${datePart}-${suffix}`;
}
