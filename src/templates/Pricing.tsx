import React from 'react';
import { Check } from 'lucide-react';

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg">
            Our transactional model is designed for scalability, allowing the 
            Criterion Educational Foundation to digitize at their own pace.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md p-8 rounded-3xl border-2 border-[#006400] bg-white relative shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#006400] text-white px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Per Book Digitization</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-5xl font-extrabold text-slate-900">$5</span>
                <span className="text-slate-500 font-medium">/book</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'High-resolution digital scanning',
                'AI-powered OCR text conversion',
                'PDF and ePub format delivery',
                'Quality assurance review',
                'Secure cloud storage access',
                'Metadata tagging for archiving',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-[#006400] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-[#006400] text-white rounded-xl font-bold hover:bg-green-800 transition-all">
              Start Project Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};