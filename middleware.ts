import { NextRequest, NextResponse } from 'next/server';
import { validateApiKeyAndRateLimit } from './src/lib/apiKey';

export async function middleware(req: NextRequest) {
  // Enforce central security & rate limiting on /api routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const authResult = await validateApiKeyAndRateLimit(req);
    if (!authResult.isValid && authResult.errorResponse) {
      return authResult.errorResponse;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
