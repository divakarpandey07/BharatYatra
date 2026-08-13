import { NextRequest, NextResponse } from 'next/server';
import { validateApiKeyAndRateLimit } from '../../../../src/lib/apiKey';
import { getStateDetails } from '../../../../src/lib/dataService';

export async function GET(req: NextRequest, { params }: { params: { stateId: string } }) {
  const securityCheck = validateApiKeyAndRateLimit(req);
  if (!securityCheck.isValid && securityCheck.errorResponse) {
    return securityCheck.errorResponse;
  }

  const result = getStateDetails(params.stateId);
  if (!result) {
    return NextResponse.json({ error: 'State not found' }, { status: 404 });
  }

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
    }
  });
}
