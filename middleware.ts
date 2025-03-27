import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAdminSession } from '@/lib/supabase';
import csrf from 'edge-csrf';

// CSRF protection configuration
const csrfProtect = csrf({
  cookie: {
    name: '__Host-csrf',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true
  }
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create Supabase client for auth
  const supabase = createMiddlewareClient({ req, res });

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
    '/contact',
    '/disclaimer',
    '/privacy-policy',
    '/admin/login'
  ];

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/car-insurance',
    '/truck-insurance',
    '/health-insurance'
  ];

  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname === route || 
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    /\.(ico|png|jpg|jpeg|svg|css|js)$/.test(req.nextUrl.pathname)
  );

  // Check if the current route is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname === route
  );

  // Handle admin routes
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    // Get admin session ID from cookie
    const sessionId = req.cookies.get('adminSessionId')?.value;

    if (!sessionId) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verify admin session
    const isValidSession = await checkAdminSession(sessionId);
    if (!isValidSession) {
      // Clear invalid session cookie
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('adminSessionId');
      return response;
    }
  }

  // Handle protected routes
  if (isProtectedRoute) {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Store the attempted URL to redirect back after login
        const redirectUrl = new URL('/sign-in', req.url);
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Check if this is a mutation request
  if (req.method === 'GET' || req.method === 'HEAD') {
    await applySecurityHeaders(res);
    return res;
  }

  // Validate CSRF token for mutation requests
  const csrfError = await csrfProtect(req, res);

  if (csrfError) {
    return new NextResponse('Invalid CSRF token', { status: 403 });
  }

  // Apply security headers
  await applySecurityHeaders(res);

  return res;
}

async function applySecurityHeaders(response: NextResponse) {
  // Define CSP Header (maintaining Clerk compatibility)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.clerk.dev https://*.clerk.dev;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.clerk.dev;
    img-src 'self' data: https: blob: https://*.clerk.dev;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.clerk.dev https://clerk.clerk.dev wss://*.clerk.dev https://*.clerk.accounts.dev;
    frame-src 'self' https://*.clerk.dev;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const headers = response.headers;
  
  // Content Security Policy
  headers.set('Content-Security-Policy', cspHeader);
  
  // Enhanced Security Headers
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  
  // HSTS (Strict-Transport-Security)
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Cache Control
  headers.set('Cache-Control', 'no-store, max-age=0');
  
  // Clear potentially sensitive data
  headers.set('X-Powered-By', '');
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/car-insurance',
    '/truck-insurance',
    '/health-insurance',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}; 