import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'rw'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /admin routes — redirect to home if no admin_access cookie
  if (pathname.startsWith('/admin')) {
    const adminCookie = request.cookies.get('admin_access');
    if (!adminCookie || adminCookie.value !== 'true') {
      // Redirect to home page (where the WhatsApp widget with admin login is)
      return NextResponse.redirect(new URL('/en', request.url));
    }
    return; // Authenticated — allow access
  }

  // Bypass paths that shouldn't be localized
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/) // skip files like images, svgs, etc.
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
