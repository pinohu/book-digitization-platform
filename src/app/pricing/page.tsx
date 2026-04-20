// src/app/pricing/page.tsx
import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold mb-4 text-stone-800">Simple, Transparent Pricing</h1>
        <p className="text-stone-600 mb-16 max-w-2xl mx-auto">
          We believe in making the preservation of Catholic Classics affordable. Our pricing is designed to scale with your library.
        </p>

        <div className="relative max-w-md mx-auto">
          {/* Pricing Card */}
          <div className="bg-white border-2 border-amber-600 rounded-3xl p-8 shadow-xl relative z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-stone-800">Standard Digitization</h3>
            <div className="flex items-center justify-center gap-1 mb-6">
              <span className="text-5xl font-serif font-bold text-stone-900">$5</span>
              <span className="text-stone-500 text-xl">/book</span>
            </div>
            
            <ul className="text-left space-y-4 mb-8">
              {[
                "High-resolution archival scanning",
                "Full-text OCR conversion",
                "Digital cleanup & formatting",
                "PDF & ePub delivery",
                "Non-destructive book handling",
                "Secure digital storage for 1 year"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-600">
                  <Check size={18} className="text-green-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/contact" className="block w-full py-4 bg-amber-700 text-white rounded-xl font-bold text-lg hover:bg-amber-800 transition-all">
              Get Started
            </Link>
          </div>
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-200 rounded-full blur-3xl -z-0 opacity-40" />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
          <div className="p-6 bg-white rounded-xl border border-stone-200">
            <h4 className="font-bold mb-2 text-stone-800">Bulk Libraries?</h4>
            <p className="text-stone-600 text-sm">For collections exceeding 500 books, we offer custom institutional rates to support the Foundation's growth.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-stone-200">
            <h4 className="font-bold mb-2 text-stone-800">Urgent Needs?</h4>
            <p className="text-stone-600 text-sm">Priority processing is available for upcoming publications or specific educational deadlines.</p>
          </div>
        </div>
      </div>
    </div>
  );
}