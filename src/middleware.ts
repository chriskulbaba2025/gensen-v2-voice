import { NextRequest, NextResponse } from 'next/server';

const LOGIN = 'https://portal.omnipressence.com/login';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('gensen_session')?.value;

  // skip static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/api')
  ) return NextResponse.next();

  // if not logged in, go to portal login
  if (!token && pathname !== LOGIN) {
    return NextResponse.redirect(LOGIN);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/report',
    '/screen-:path*',
    '/new-user',
    '/existing-user',
  ],
};
