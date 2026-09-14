import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  // First update Supabase session
  const response = await updateSession(request)

  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Handle subdomain routing for 'academy'
  if (hostname.startsWith('academy.')) {
    const rewriteUrl = new URL(`/academy${url.pathname === '/' ? '' : url.pathname}`, request.url);
    // Since updateSession might return a modified response, we can just rewrite using NextResponse.rewrite
    return NextResponse.rewrite(rewriteUrl, {
      headers: response.headers
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
