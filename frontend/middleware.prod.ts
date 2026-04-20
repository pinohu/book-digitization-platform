import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

/**
 * Production middleware using NextAuth for authentication
 * This file should be renamed to middleware.ts when deploying to production
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Add response headers for security
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none'");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Allow access to public assets
  if (nextUrl.pathname.startsWith("/_next") || 
      nextUrl.pathname.startsWith("/api/auth") ||
      nextUrl.pathname.includes(".") ||
      nextUrl.pathname === "/favicon.ico") {
    return response;
  }

  // Public routes - always accessible
  if (nextUrl.pathname === "/" ||
      nextUrl.pathname === "/signin" ||
      nextUrl.pathname === "/signup" ||
      nextUrl.pathname === "/error") {
    return response;
  }

  // Protected routes - require authentication
  if (!isLoggedIn) {
    const redirectUrl = new URL("/signin", nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
})

export const config = {
  matcher: ['/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)'],
}; 