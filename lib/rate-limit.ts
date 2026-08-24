/**
 * Minimal in-memory sliding-window rate limiter for POST /api/orders.
 *
 * This is spam/abuse mitigation, NOT exact global accounting:
 * state lives in this module, so it is per server instance/process.
 * With multiple instances or frequent serverless cold starts each
 * instance enforces its own window — deliberate trade-off to avoid
 * an external dependency (Redis/Upstash). Chosen limit is generous
 * (5 attempts / 10 min / IP): far above any normal customer's order
 * rate, including several people behind one shared NAT IP, while
 * still capping sheet/API abuse.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const CLEANUP_INTERVAL_MS = 60 * 1000;

const attempts = new Map<string, number[]>();
let lastCleanupAt = 0;

/**
 * x-forwarded-for first (set by proxies/load balancers — e.g. Vercel);
 * leftmost value is the original client. Falls back to x-real-ip,
 * then "unknown" (direct connections share one bucket).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim().toLowerCase();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim().toLowerCase();
  return "unknown";
}

function cleanupExpired(now: number): void {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;
  for (const [key, stamps] of attempts) {
    const live = stamps.filter((t) => now - t < WINDOW_MS);
    if (live.length === 0) attempts.delete(key);
    else attempts.set(key, live);
  }
}

/** Records one attempt for `key` and returns true when the caller must reject with 429. */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  cleanupExpired(now);

  const live = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (live.length >= MAX_ATTEMPTS) {
    attempts.set(key, live);
    return true;
  }
  live.push(now);
  attempts.set(key, live);
  return false;
}
