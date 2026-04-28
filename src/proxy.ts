import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/shared/constants';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const isAuthenticated = Boolean(accessToken);
  const isPublicRoute = pathname === '/' || pathname === '/callback';

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/callback' && isAuthenticated) {
    return NextResponse.redirect(new URL('/mypage', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|fonts).*)',
  ],
};
