// src/app/services/page.tsx
import React from 'react';
import { Scan, FileCheck, Layout, Database } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: "Non-Destructive Scanning",
      icon: <Scan className="text-amber-700" />,
      desc: "We use specialized overhead scanners that do not require the book to be laid flat or the spine to be cracked, ensuring the physical integrity of every classic.",
      features: ["High-DPI capture", "Glare reduction", "Edge-to-edge clarity"]
    },
    {
      title: "Theological OCR Cleanup",
      icon: <FileCheck className="text-amber-700" />,
      desc: "Generic OCR often fails with archaic fonts or Latin terms. Our process includes manual verification to ensure theological precision.",
      features: ["Latin language support", "Manual typo correction", "Searchable indexing"]
    },
    {
      title: "Digital Formatting",
      icon: <Layout className="text-amber-700" />,
      desc: "We convert raw scans into polished digital formats suitable for Kindle, iPads, or scholarly print-on-demand services.",
      features: ["ePub & PDF/A", "Custom Table of Contents", "Consistent typography"]
    },
    {
      title: "Archive Management",
      icon: <Database className="text-amber-700" />,
      desc: "Organization of the digitized library into a structured digital repository for easy retrieval and distribution.",
      features: ["Metadata tagging", "Cloud backup", "Version control"]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold mb-4 text-stone-800">Digitization Services</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            A specialized workflow designed for the unique needs of the Criterion Educational Foundation's library.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="p-8 bg-white border border-stone-200 rounded-2xl hover:border-amber-300 transition-colors group">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-stone-800">{service.title}</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feat, i) => (
                  <li key={i} className="text-sm text-stone-500 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}