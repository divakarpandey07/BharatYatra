import { NextRequest, NextResponse } from 'next/server';
import { validateApiKeyAndRateLimit } from '../../../../src/lib/apiKey';
import { getDistrictPlaces } from '../../../../src/lib/dataService';

export async function GET(req: NextRequest, { params }: { params: { districtId: string } }) {
  const securityCheck = await validateApiKeyAndRateLimit(req);
  if (!securityCheck.isValid && securityCheck.errorResponse) {
    return securityCheck.errorResponse;
  }

  const result = getDistrictPlaces(params.districtId);

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
    }
  });
}
