const memoryCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

const API_KEY = process.env.NEXT_PUBLIC_BHARATYATRA_API_KEY || 'bharatyatra_secret_key_2026';

export async function fetchWithCache(url: string): Promise<any> {
  const now = Date.now();
  const cached = memoryCache.get(url);

  if (cached && now < cached.expiry) {
    return cached.data;
  }

  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

    const res = await fetch(fullUrl, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 600 } // Next.js ISR revalidation (10 mins)
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    memoryCache.set(url, { data, expiry: now + CACHE_TTL_MS });
    return data;
  } catch (error) {
    console.error(`Failed to fetch from API [${url}]:`, error);
    throw error;
  }
}
