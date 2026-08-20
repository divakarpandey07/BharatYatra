import { validateApiKeyAndRateLimit } from '../apiKey';
import { NextRequest } from 'next/server';

// Lightweight integration & unit test suite for API security
async function runSecurityTests() {
  console.log("--- RUNNING API SECURITY & RATE LIMITER TESTS ---");

  // Test 1: Same-origin internal request (allowed)
  const internalReq = new NextRequest('http://localhost:3000/api/states', {
    headers: { 'referer': 'http://localhost:3000/states' }
  });
  const res1 = await validateApiKeyAndRateLimit(internalReq);
  console.assert(res1.isValid === true, "Test 1 Failed: Same-origin request should be valid");
  console.log("✓ Test 1 Passed: Same-origin request allowed");

  // Test 2: External request without API key (rejected 401)
  const externalReq = new NextRequest('http://localhost:3000/api/states', {
    headers: { 'origin': 'https://malicious-external-site.com' }
  });
  const res2 = await validateApiKeyAndRateLimit(externalReq);
  console.assert(res2.isValid === false, "Test 2 Failed: External request without API key should be rejected");
  console.assert(res2.errorResponse?.status === 401, "Test 2 Failed: Status should be 401");
  console.log("✓ Test 2 Passed: External request without API key blocked with 401");

  console.log("--- ALL API SECURITY TESTS PASSED SUCCESSFULLY ---");
}

if (process.env.RUN_TESTS === 'true') {
  runSecurityTests();
}
