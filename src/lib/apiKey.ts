import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_MINUTE = 120;

// Production Startup Environment Guard
if (process.env.NODE_ENV === 'production' && !process.env.BHARATYATRA_API_KEY) {
  console.error('[SECURITY WARNING] BHARATYATRA_API_KEY environment variable is missing in production! Unauthenticated external API requests will be blocked.');
}

// Edge-safe fallback in-memory store (used only when Upstash Redis env vars are not set)
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

// Upstash REST Redis Rate Limiting (Edge-Native via Fetch API)
async function rateLimitWithUpstash(key: string): Promise<{ count: number; allowed: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return { count: 0, allowed: true };

  try {
    const pipelineUrl = `${url}/pipeline`;
    const res = await fetch(pipelineUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', `ratelimit:${key}`],
        ['EXPIRE', `ratelimit:${key}`, RATE_LIMIT_WINDOW_SECONDS],
      ]),
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      const currentCount = data[0]?.result || 1;
      return { count: currentCount, allowed: currentCount <= MAX_REQUESTS_PER_MINUTE };
    }
  } catch (err) {
    console.error('[RATE LIMIT ERROR] Upstash Redis request failed:', err);
  }

  return { count: 0, allowed: true };
}

// Edge-safe In-Memory Rate Limiting Fallback (No setInterval)
function rateLimitWithInMemory(key: string): { count: number; allowed: boolean } {
  const now = Date.now();
  
  // Inline cleanup of expired entries
  if (inMemoryStore.size > 1000) {
    inMemoryStore.forEach((data, k) => {
      if (now > data.resetTime) inMemoryStore.delete(k);
    });
  }

  const record = inMemoryStore.get(key);
  if (!record || now > record.resetTime) {
    inMemoryStore.set(key, { count: 1, resetTime: now + (RATE_LIMIT_WINDOW_SECONDS * 1000) });
    return { count: 1, allowed: true };
  }

  record.count += 1;
  return { count: record.count, allowed: record.count <= MAX_REQUESTS_PER_MINUTE };
}

export async function validateApiKeyAndRateLimit(
  req: NextRequest
): Promise<{ isValid: boolean; errorResponse?: NextResponse }> {
  const validApiKey = process.env.BHARATYATRA_API_KEY;
  const requestOrigin = req.nextUrl.origin;

  // 1. Extract Headers & Parameters
  const apiKeyHeader = req.headers.get('x-api-key');
  const apiKeyQuery = req.nextUrl.searchParams.get('apiKey');
  const providedKey = apiKeyHeader || apiKeyQuery;

  // 2. Strict Origin Header Validation over Brittle Referer
  const originHeader = req.headers.get('origin');
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
  const allowedOriginsList = allowedOriginsEnv 
    ? allowedOriginsEnv.split(',').map(o => o.trim())
    : [requestOrigin];

  let isSameOrigin = false;
  if (originHeader) {
    isSameOrigin = allowedOriginsList.includes(originHeader);
  } else {
    // If no origin header (e.g. standard navigation / server calls), check referer URL origin strictly
    const referer = req.headers.get('referer');
    if (referer) {
      try {
        const refererOrigin = new URL(referer).origin;
        isSameOrigin = allowedOriginsList.includes(refererOrigin);
      } catch {
        isSameOrigin = false;
      }
    }
  }

  // 3. Reject Unauthorized External Requests
  if (!isSameOrigin) {
    if (!validApiKey || providedKey !== validApiKey) {
      console.warn(`[SECURITY ALERT 401] Unauthorized API request to ${req.nextUrl.pathname} from ${originHeader || 'unknown-origin'}`);
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          { 
            error: 'Unauthorized', 
            message: 'Invalid or missing API key. Please provide a valid x-api-key header.' 
          },
          { status: 401 }
        )
      };
    }
  }

  // 4. Safe Client Identifier & IP Extraction
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : (realIp || 'unknown-client-ip');

  // Rate-limit per API key for authenticated clients, or per IP for unauthenticated clients
  const rateLimitKey = providedKey ? `key:${providedKey.slice(0, 8)}` : `ip:${clientIp}`;

  // 5. Rate Limiting Check (Upstash Redis with In-Memory Fallback)
  let limitResult: { count: number; allowed: boolean };
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    limitResult = await rateLimitWithUpstash(rateLimitKey);
  } else {
    limitResult = rateLimitWithInMemory(rateLimitKey);
  }

  if (!limitResult.allowed) {
    console.warn(`[SECURITY ALERT 429] Rate limit exceeded for ${rateLimitKey} on ${req.nextUrl.pathname}`);
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        { 
          error: 'Too Many Requests', 
          message: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_MINUTE} requests allowed per minute.` 
        },
        { 
          status: 429, 
          headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS) } 
        }
      )
    };
  }

  return { isValid: true };
}
