import { NextRequest, NextResponse } from 'next/server';

// Sliding-window in-memory rate limiter store with TTL cleanup
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 120;

// Periodic cleanup of stale rate limit entries to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    ipRequestCounts.forEach((data, ip) => {
      if (now > data.resetTime) {
        ipRequestCounts.delete(ip);
      }
    });
  }, 5 * 60 * 1000);
}

export function validateApiKeyAndRateLimit(req: NextRequest): { isValid: boolean; errorResponse?: NextResponse } {
  const validApiKey = process.env.BHARATYATRA_API_KEY;

  // 1. API Key & Same-Origin Authorization
  const apiKeyHeader = req.headers.get('x-api-key');
  const apiKeyQuery = req.nextUrl.searchParams.get('apiKey');
  const providedKey = apiKeyHeader || apiKeyQuery;

  // Robust URL-based Same-Origin check
  const referer = req.headers.get('referer');
  const requestOrigin = req.nextUrl.origin;
  let isSameOrigin = false;

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      isSameOrigin = refererOrigin === requestOrigin;
    } catch {
      isSameOrigin = false;
    }
  }

  // Reject unauthorized external API requests if API Key doesn't match or isn't set
  if (!isSameOrigin) {
    if (!validApiKey || providedKey !== validApiKey) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          { 
            error: 'Unauthorized', 
            message: 'Invalid or missing API key. Configure BHARATYATRA_API_KEY environment variable or provide a valid x-api-key header.' 
          },
          { status: 401 }
        )
      };
    }
  }

  // 2. Safe Client IP Extraction
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : (realIp || '127.0.0.1');

  const now = Date.now();
  const clientData = ipRequestCounts.get(clientIp);

  if (!clientData || now > clientData.resetTime) {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  } else {
    clientData.count += 1;
    if (clientData.count > MAX_REQUESTS_PER_MINUTE) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          { 
            error: 'Too Many Requests', 
            message: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_MINUTE} requests allowed per minute.` 
          },
          { status: 429, headers: { 'Retry-After': '60' } }
        )
      };
    }
  }

  return { isValid: true };
}
