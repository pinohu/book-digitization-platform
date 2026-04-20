import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/components/providers";
import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "AI ∞ OS",
    template: "%s | AI ∞ OS"
  },
  description: "The Infinite Operating System for Intelligence, Infrastructure, and Adaptive Empire Creation",
  keywords: ["AI", "automation", "agents", "infrastructure", "orchestration", "machine learning"],
  authors: [{ name: "AI ∞ OS Team" }],
  creator: "AI ∞ OS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-os.dev",
    title: "AI ∞ OS",
    description: "The Infinite Operating System for Intelligence, Infrastructure, and Adaptive Empire Creation",
    siteName: "AI ∞ OS"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI ∞ OS",
    description: "The Infinite Operating System for Intelligence, Infrastructure, and Adaptive Empire Creation",
    creator: "@ai_os"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
          </Providers>
          <Toaster />
          <TailwindIndicator />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
} 