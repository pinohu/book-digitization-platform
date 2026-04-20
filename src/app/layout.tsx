import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import './globals.css';

/**
 * CONSULTANT STRATEGIC NOTE: LAYOUT ARCHITECTURE
 * The root layout is engineered to establish the visual identity of the Book Digitization Platform.
 * By utilizing Next.js 14 Server Components, we minimize the client-side JavaScript bundle,
 * ensuring that the initial paint of the "Catholic Classics" digitization interface is instantaneous.
 * The choice of Merriweather for headings evokes the prestige and permanence of theological texts,
 * while Open Sans provides the necessary legibility for high-density administrative data in the dashboard.
 * 
 * DESIGN SPECIFICATION ALIGNMENT:
 * - Primary Font: Merriweather (Serif) for Display/Headings
 * - Secondary Font: Open Sans (Sans-serif) for UI/Body
 * - Color Palette: Integrated via globals.css custom properties to ensure consistency across themes.
 * - Accessibility: WCAG 2.1 compliant contrast ratios between #006400 (Accent) and #FDFCFB (Background).
 */

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Criterion Digitization | Preserving Catholic Classics',
  description: 'Professional AI-powered document digitization for the Criterion Educational Foundation and Origin Eyes Inc. Transforming physical theological archives into searchable, high-fidelity digital assets.',
  keywords: ['Book Digitization', 'Catholic Classics', 'OCR', 'Criterion Educational Foundation', 'Academic Archiving'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${merriweather.variable} ${openSans.variable} font-sans bg-background text-foreground antialiased`}
        style={{ backgroundColor: '#FDFCFB', color: '#1A1C1A' }}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* 
              The main wrapper ensures that the surface color (#FFFFFF) and 
              the background color (#FDFCFB) create a subtle depth contrast 
              consistent with the Design Contract.
          */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Global Footer for Brand Consistency */}
          <footer className="border-t border-border bg-surface py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-accent">Criterion Digitization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A strategic partnership between the Criterion Educational Foundation (Nigeria) 
                  and Origin Eyes Incorporated (USA) to preserve the intellectual heritage of 
                  Catholic Classics through high-precision AI digitization.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider">Platform</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                    <li><a href="/dashboard" className="hover:text-accent transition-colors">Dashboard</a></li>
                    <li><a href="/archive" className="hover:text-accent transition-colors">Archive</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider">Legal</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              <div className="text-sm text-right text-muted-foreground">
                <p>© 2024 Origin Eyes Inc. 501(c)(3) Non-Profit.</p>
                <p>Powered by OpenAI OCR & Neon Postgres.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}