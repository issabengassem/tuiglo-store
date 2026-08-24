import { getSheetsAccessToken } from "../lib/sheets/google-auth";
import { recordOrderInSheets } from "../lib/sheets/orders-sheet";

const SUBMISSION_TOKEN = "audit-test-" + Date.now();

interface TestCustomer {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

const testOrder: {
  lines: [{ productId: string; colorVariantId: string; qty: number }];
  customer: TestCustomer;
  submissionToken: string;
} = {
  lines: [
    {
      productId: "prod-backpack-nike",
      colorVariantId: "cv-nike-1",
      qty: 1,
    },
  ],
  customer: {
    name: "AUDIT TEST — DO NOT FULFILL",
    phone: "0600000000",
    address: "AUDIT TEST ADDRESS",
    city: "TEST CITY",
  },
  submissionToken: SUBMISSION_TOKEN,
};

async function main() {
  console.log("=== Google Sheets Integration Test ===\n");

  // Step 1: Verify env vars are present
  const requiredEnvs = [
    "GOOGLE_SHEETS_SPREADSHEET_ID",
    "GOOGLE_SHEETS_CLIENT_EMAIL",
    "GOOGLE_SHEETS_PRIVATE_KEY",
  ];

  const missing = requiredEnvs.filter((e) => !process.env[e]);
  if (missing.length > 0) {
    console.error("FAILURE: Missing environment variables:");
    missing.forEach((m) => console.error(`  - ${m}`));
    console.error(
      "\nSet these in .env.local (never commit real credentials)."
    );
    process.exit(1);
  }

  console.log("✓ All required environment variables present\n");

  // Step 2: Attempt to get a Sheets access token
  try {
    console.log("Attempting to fetch Google Sheets access token...");
    await getSheetsAccessToken();
    console.log("✓ Successfully fetched access token (cached for 1h)\n");
  } catch (err) {
    console.error("FAILURE: Could not fetch Google Sheets access token:");
    console.error(
      `  Error: ${err instanceof Error ? err.message : String(err)}`
    );
    console.error(
      "\nThis typically means: invalid service account credentials,"
    );
    console.error("Google Sheets API not enabled, or missing EDITOR permission"
    );
    console.error("on the target spreadsheet for the service account client_email.");
    process.exit(1);
  }

  // Step 3: Attempt to record a test order in Sheets
  console.log(
    `\nAttempting to append test order to spreadsheet "${process.env.GOOGLE_SHEETS_SPREADSHEET_ID}"...`
  );
  const sheetsStatus = await recordOrderInSheets(
    {
      id: `AUDIT-TEST-${SUBMISSION_TOKEN}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: testOrder.customer.name,
        phone: testOrder.customer.phone,
        address: testOrder.customer.address,
        city: testOrder.customer.city,
        notes: testOrder.customer.notes,
      },
      lines: testOrder.lines.map((line) => ({
        productId: line.productId,
        colorVariantId: line.colorVariantId,
        qty: line.qty,
        unitPriceApplied: 0,
      })),
      subtotal: 0,
      wholesaleDiscountTotal: 0,
      total: 0,
      paymentMethod: "cod",
      paymentStatus: "not_applicable",
      status: "submitted",
    },
    "⚠️ audit test order — ignore this message"
  );

  // Step 4: Report result
  console.log("\n=== Result ===");
  // Use type assertion to allow string comparison narrowing
  const status = sheetsStatus as unknown as string;
  if (status === "ok") {
    console.log("✅ SUCCESS: Test order appended to Google Sheets successfully.");
    console.log(
      "The order row appears in the 'Orders' tab. The WhatsApp handoff"
    );
    console.log("channel also works independently (order does not block on Sheets).");
  } else if (status === "duplicate_skipped") {
    console.log("⚠️ DUPLICATE: Test order was skipped because an identical order_id");
    console.log("already exists in the sheet (from a previous run). This is expected");
    console.log("on re-runs and does not indicate an error.");
  } else if (status === "failed") {
    console.error("❌ FAILURE: Google Sheets write failed.");
    console.error(
      "The order could not be appended. The WhatsApp handoff still works;"
    );
    console.error("fulfillment relies on the WhatsApp message, not the sheet.");
  } else {
    console.error(`❓ UNKNOWN STATUS: ${sheetsStatus}`);
  }

  console.log("\n=== Test Complete ===");
}

main().catch((err) => {
  console.error("Fatal error during test:", err);
  process.exit(1);
});