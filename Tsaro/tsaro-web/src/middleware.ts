import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. academy.tsaroglobaldefence.com, academy.localhost:3000)
  const hostname = req.headers.get('host') || '';

  // Handle subdomain routing for 'academy'
  if (hostname.startsWith('academy.')) {
    // We rewrite the URL to the `/academy` route. 
    // If the path is `/` it rewrites to `/academy`.
    // If the path is `/about` it rewrites to `/academy/about`
    const rewriteUrl = new URL(`/academy${url.pathname === '/' ? '' : url.pathname}`, req.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
