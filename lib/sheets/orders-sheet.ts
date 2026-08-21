import type { Order } from "@/data/types";
import { getColorVariantById, getProductById } from "@/data/products";
import { getSheetsAccessToken } from "./google-auth";

const SHEET_NAME = "Orders";

function spreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id) throw new Error("Missing GOOGLE_SHEETS_SPREADSHEET_ID");
  return id;
}

async function orderIdExists(token: string, orderId: string): Promise<boolean> {
  const range = `${SHEET_NAME}!A:A`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId()}/values/${encodeURIComponent(range)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Sheets read failed (${res.status})`);
  const data = (await res.json()) as { values?: string[][] };
  return (data.values ?? []).some((row) => row[0] === orderId);
}

/**
 * order.createdAt stays plain UTC (the domain-standard representation) —
 * only the Sheet's human-facing timestamp column is shown in Casablanca
 * local time (UTC+1), since that's who actually reads this sheet.
 */
function toCasablancaTimestamp(createdAtUtc: string): string {
  const shifted = new Date(new Date(createdAtUtc).getTime() + 60 * 60 * 1000);
  return shifted.toISOString().replace("Z", "+01:00");
}

/** Denormalized (id + human-readable name/color) so both n8n and a human glancing at the sheet can read it. */
function serializeItems(order: Order): string {
  return JSON.stringify(
    order.lines.map((line) => ({
      productId: line.productId,
      productName: getProductById(line.productId)?.name.ar ?? line.productId,
      colorVariantId: line.colorVariantId,
      colorName: getColorVariantById(line.colorVariantId)?.colorName.ar ?? "",
      qty: line.qty,
      unitPriceApplied: line.unitPriceApplied,
      lineTotal: line.unitPriceApplied * line.qty,
    }))
  );
}

function toRow(order: Order, whatsappMessage: string): (string | number)[] {
  return [
    order.id,
    toCasablancaTimestamp(order.createdAt),
    order.customer.name,
    order.customer.phone,
    order.customer.city,
    order.customer.address,
    order.customer.notes ?? "",
    serializeItems(order),
    order.subtotal,
    order.wholesaleDiscountTotal,
    order.total,
    order.paymentMethod,
    order.paymentStatus,
    order.status,
    "website",
    whatsappMessage,
  ];
}

export type SheetsWriteStatus = "ok" | "duplicate_skipped" | "failed";

/**
 * Never throws — a Sheets failure must not block the WhatsApp handoff
 * (Phase 1 failure-handling requirement). The order_id-existence check
 * before appending is a best-effort duplicate guard, not a database-backed
 * atomic guarantee — see the Phase 1 report for the exact limitation.
 */
export async function recordOrderInSheets(order: Order, whatsappMessage: string): Promise<SheetsWriteStatus> {
  try {
    const token = await getSheetsAccessToken();
    if (await orderIdExists(token, order.id)) {
      return "duplicate_skipped";
    }
    const range = `${SHEET_NAME}!A:P`;
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId()}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [toRow(order, whatsappMessage)] }),
      }
    );
    if (!res.ok) throw new Error(`Sheets append failed (${res.status})`);
    return "ok";
  } catch (err) {
    console.error("[orders] Google Sheets write failed:", err instanceof Error ? err.message : err);
    return "failed";
  }
}
