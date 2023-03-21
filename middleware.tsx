import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   //   return NextResponse.redirect(new URL('/about-2', request.url));
//   console.log(request.url);
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
  ],
};

export { default } from 'next-auth/middleware';
