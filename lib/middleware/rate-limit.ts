import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// Create Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter instance
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
  prefix: 'api_ratelimit',
});

export async function rateLimiter(identifier: string) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
  const ratelimitIdentifier = `${identifier}:${ip}`;

  const { success, limit, reset, remaining } = await ratelimit.limit(ratelimitIdentifier);

  if (!success) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: reset - Date.now(),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return null;
} 