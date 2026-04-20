import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth";

const handler = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demo purposes, we'll use a hardcoded user
        // In a real app, you would verify against your database
        if (credentials.email === "demo@example.com" && credentials.password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
          };
        }

        return null;
      }
    })
  ],
});

export { handler as GET, handler as POST }; 