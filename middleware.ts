import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAdminSession } from '@/lib/supabase';

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

  return res;
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