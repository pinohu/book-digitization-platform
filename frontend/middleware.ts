import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// Simple pass-through middleware for development
const isDevelopment = process.env.NODE_ENV === "development";

export default isDevelopment
  ? // In development, allow all routes
    function middleware() {
      return NextResponse.next();
    }
  : // In production, use NextAuth middleware
    auth((req) => {
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

      return response;
    });

export const config = {
  matcher: ['/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)'],
}; 