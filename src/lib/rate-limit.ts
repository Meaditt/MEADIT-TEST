/**
 * Simple in-memory rate limiter.
 * Tracks requests per IP within a sliding time window.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

// Cap total tracked IPs to prevent memory leak
const MAX_TRACKED_IPS = 10000;

export function rateLimit(
  storeName: string,
  ip: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number } {
  if (!stores.has(storeName)) {
    stores.set(storeName, new Map());
  }

  const store = stores.get(storeName)!;
  const now = Date.now();

  // Clean expired entries periodically
  if (store.size > MAX_TRACKED_IPS) {
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key);
    }
  }

  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

/**
 * Sanitize user input to prevent formula injection (for Sheets/CSV)
 * and strip control characters.
 */
export function sanitizeInput(value: string, maxLength = 500): string {
  let s = value.slice(0, maxLength).trim();

  // Strip control characters (except newline, tab)
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Prevent spreadsheet formula injection
  if (/^[=+\-@]/.test(s)) {
    s = `'${s}`;
  }

  return s;
}

/**
 * Get client IP from request headers (works behind proxies/Vercel).
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
