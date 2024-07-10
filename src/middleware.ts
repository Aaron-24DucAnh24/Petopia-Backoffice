import { NextRequest, NextResponse } from 'next/server';
import { COOKIES_NAME } from './utils/constants';

export default function middleware(request: NextRequest) {
  if (!request.cookies.has(COOKIES_NAME.ADMIN_ACCESS_TOKEN_SERVER)) {
    const response = NextResponse.rewrite(new URL('/login', request.url));
    response.cookies.set(
      COOKIES_NAME.ADMIN_REDIRECT,
      request.nextUrl.pathname + request.nextUrl.search
    );
    return response;
  }
}

export const config = {
  matcher: ['/', '/management'],
};
