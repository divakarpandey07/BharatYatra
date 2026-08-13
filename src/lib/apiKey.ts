import { NextRequest, NextResponse } from 'next/server';

// Sliding-window rate limiter per IP address
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 120;

const VALID_API_KEY = process.env.BHARATYATRA_API_KEY || 'bharatyatra_secret_key_2026';

export function validateApiKeyAndRateLimit(req: NextRequest): { isValid: boolean; errorResponse?: NextResponse } {
  // 1. API Key Validation
  const apiKeyHeader = req.headers.get('x-api-key');
  const apiKeyQuery = req.nextUrl.searchParams.get('apiKey');
  const providedKey = apiKeyHeader || apiKeyQuery;

  // Allow same-origin internal Next.js server calls or key-validated requests
  const referer = req.headers.get('referer') || '';
  const host = req.headers.get('host') || '';
  const isSameOrigin = referer.includes(host);

  if (!isSameOrigin && providedKey !== VALID_API_KEY) {
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        { 
          error: 'Unauthorized: Invalid or missing API key', 
          message: 'Please provide a valid x-api-key header or apiKey query parameter to access BharatYatra APIs.' 
        },
        { status: 401 }
      )
    };
  }

  // 2. Rate Limiting
  const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
  const now = Date.now();
  const clientData = ipRequestCounts.get(ip);

  if (!clientData || now > clientData.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
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
