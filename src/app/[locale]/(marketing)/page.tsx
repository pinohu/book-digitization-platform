// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-amber-800 uppercase bg-amber-100 rounded-full">
            Preserving Catholic Wisdom for the Digital Age
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-stone-800">
            Bringing Catholic Classics <br /> 
            <span className="text-amber-700">From Paper to Pixel</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            We help the Criterion Educational Foundation transition their physical library of Catholic Classics into high-fidelity digital archives, ensuring timeless truths are accessible to every believer, everywhere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing" className="px-8 py-4 bg-amber-700 text-white rounded-lg font-semibold text-lg hover:bg-amber-800 transition-all flex items-center justify-center gap-2">
              Start Digitizing Now <ArrowRight size={20} />
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-lg font-semibold text-lg hover:bg-stone-50 transition-all">
              Our Mission
            </Link>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-amber-50 opacity-50 rounded-l-full blur-3xl" />
      </header>

      {/* Trust Proof / Mission Bar */}
      <section className="py-12 bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="text-amber-700 mb-3" size={32} />
              <h3 className="font-bold text-lg">Archival Integrity</h3>
              <p className="text-stone-500 text-sm">Non-destructive scanning to protect original texts.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="text-amber-700 mb-3" size={32} />
              <h3 className="font-bold text-lg">Global Accessibility</h3>
              <p className="text-stone-500 text-sm">Making Nigerian Catholic scholarship available worldwide.</p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="text-amber-700 mb-3" size={32} />
              <h3 className="font-bold text-lg">Faith-Driven Quality</h3>
              <p className="text-stone-500 text-sm">Meticulous OCR for theological precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Physical Book Handling */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">The Preservation Process</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">We don't just scan pages; we preserve legacies. Our specialized workflow is designed for the delicate nature of physical books.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Intake & Audit", desc: "Careful physical assessment of book condition and binding." },
              { step: "02", title: "Precision Capture", desc: "High-resolution overhead scanning to avoid spine damage." },
              { step: "03", title: "Text Extraction", desc: "Advanced OCR to convert images into searchable, editable text." },
              { step: "04", title: "Digital Archiving", desc: "Delivery of clean PDFs and ePubs for global distribution." },
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 bg-white border border-stone-200 rounded-xl hover:shadow-md transition-shadow">
                <span className="text-4xl font-serif font-bold text-amber-200 absolute top-4 right-6">{item.step}</span>
                <h4 className="text-xl font-bold mb-3 relative z-10">{item.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-stone-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to digitize your library?</h2>
          <p className="text-stone-400 mb-10 text-lg">Join us in ensuring that the wisdom of the Catholic Classics is never lost to time or physical decay.</p>
          <Link href="/contact" className="px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold text-lg hover:bg-amber-500 transition-all inline-block">
            Request a Digitization Quote
          </Link>
        </div>
      </section>
    </div>
  );
}