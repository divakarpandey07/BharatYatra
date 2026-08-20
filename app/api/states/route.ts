import { NextRequest, NextResponse } from 'next/server';
import { validateApiKeyAndRateLimit } from '../../../src/lib/apiKey';
import { getStatesData } from '../../../src/lib/dataService';

export async function GET(req: NextRequest) {
  const securityCheck = await validateApiKeyAndRateLimit(req);
  if (!securityCheck.isValid && securityCheck.errorResponse) {
    return securityCheck.errorResponse;
  }

  const statesSummary = getStatesData();

  return NextResponse.json(statesSummary, {
    headers: {
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
    }
  });
}
