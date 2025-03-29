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
    '/admin/login',
    '/car-insurance',
    '/truck-insurance',
    '/health-insurance',
    '/insurance'
  ];

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname === route || 
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    /\.(ico|png|jpg|jpeg|svg|css|js)$/.test(req.nextUrl.pathname)
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

  // Check if this is a mutation request
  if (req.method === 'GET' || req.method === 'HEAD') {
    return res;
  }

  // Validate CSRF token for mutation requests
  const csrfError = await csrfProtect(req, res);

  if (csrfError) {
    return new NextResponse('Invalid CSRF token', { status: 403 });
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}; 