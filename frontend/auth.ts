import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Define our own NextAuthConfig type
type NextAuthConfig = {
  providers: any[];
  callbacks: {
    jwt: (params: { token: JWT; user?: any }) => Promise<JWT>;
    session: (params: { session: any; token: JWT }) => any;
    authorized: (params: { auth: any; request: { nextUrl: URL } }) => boolean;
  };
  pages: {
    signIn: string;
    signOut: string;
    error: string;
  };
  session: {
    strategy: "jwt";
  };
};

// Extend the session type to include user.id
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo credentials
        if (credentials.email === "demo@example.com" && credentials.password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      
      // Public routes that don't require authentication
      const isPublicRoute = pathname.startsWith('/signin') || 
                            pathname.startsWith('/signup') ||
                            pathname === '/';
      
      if (isPublicRoute) return true;
      
      // Protected routes require authentication
      if (!isLoggedIn) return false;
      
      return true;
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin',
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig); 