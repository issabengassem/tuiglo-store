import { sign as cryptoSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let cached: CachedToken | null = null;

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function readServiceAccountEnv(): { clientEmail: string; privateKey: string } {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (!clientEmail || !privateKeyRaw) {
    throw new Error("Missing GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY");
  }
  // .env values can't contain real newlines, so the key is stored with
  // literal "\n" and unescaped here.
  return { clientEmail, privateKey: privateKeyRaw.replace(/\\n/g, "\n") };
}

/**
 * Self-signed JWT exchanged for a bearer token — Google's service-account
 * flow. No OAuth consent screen, no refresh-token expiry to babysit (unlike
 * the separate n8n "Google Sheets account" OAuth2 credential), and no new
 * dependency: Node's built-in crypto.sign covers RS256 signing.
 */
export async function getSheetsAccessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 30_000) {
    return cached.accessToken;
  }

  const { clientEmail, privateKey } = readServiceAccountEnv();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = cryptoSign("RSA-SHA256", Buffer.from(unsigned), privateKey);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status})`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cached = { accessToken: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}
