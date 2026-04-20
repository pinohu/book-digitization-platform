// src/app/docs/page.tsx
import React from 'react';
import { CheckCircle2, FileText, Search, Eye } from 'lucide-react';

export default function DocsPage() {
  const samples = [
    {
      title: "Theological Treatise",
      before: "Faded ink, yellowed pages, handwritten margins.",
      after: "Crystal clear 600dpi scan, searchable text, indexed chapters.",
      status: "Preserved"
    },
    {
      title: "Liturgical Guide",
      before: "Fragile binding, blurred typography.",
      after: "Digitally restored contrast, OCR-corrected Latin text.",
      status: "Preserved"
    },
    {
      title: "Historical Archive",
      before: "Physical storage in Nigeria, limited access.",
      after: "Cloud-hosted PDF, accessible via any mobile device.",
      status: "Preserved"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold mb-4 text-stone-800">Quality Standards & Gallery</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            We hold our digitization to archival standards. See the difference between a physical relic and a digital asset.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {samples.map((sample, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-stone-800">{sample.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {sample.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                <div className="p-8">
                  <div className="flex items-center gap-2 text-stone-400 mb-4">
                    <Eye size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wide">Physical State</span>
                  </div>
                  <p className="text-stone-600 italic">{sample.before}</p>
                </div>
                <div className="p-8 bg-amber-50/30">
                  <div className="flex items-center gap-2 text-amber-700 mb-4">
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wide">Digital Outcome</span>
                  </div>
                  <p className="text-stone-800 font-medium">{sample.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-stone-800 rounded-2xl text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="p-3 bg-stone-700 rounded-lg h-fit"><FileText className="text-amber-400" /></div>
              <div>
                <h4 className="font-bold mb-2">PDF/A Format</h4>
                <p className="text-stone-400 text-sm">We use PDF/A, the international standard for long-term digital preservation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-stone-700 rounded-lg h-fit"><Search className="text-amber-400" /></div>
              <div>
                <h4 className="font-bold mb-2">Full-Text Search</h4>
                <p className="text-stone-400 text-sm">Every page is processed via OCR, making every word in the book searchable.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-stone-700 rounded-lg h-fit"><CheckCircle2 className="text-amber-400" /></div>
              <div>
                <h4 className="font-bold mb-2">Manual QA</h4>
                <p className="text-stone-400 text-sm">Humans review the OCR output to ensure theological terms are spelled correctly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}