import { NextResponse, type NextRequest } from 'next/server';

/**
 * Garde-fou UX uniquement : vérifie la présence du cookie de session, pas
 * sa validité (signature/expiration). La frontière de sécurité réelle est
 * `JwtAuthGuard` côté apps/api, qui reçoit ce même token sur chaque appel
 * (ADR 0011, décision 3).
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has('admin_session');
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!hasSession && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (hasSession && isLoginPage) {
    return NextResponse.redirect(new URL('/blog', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
