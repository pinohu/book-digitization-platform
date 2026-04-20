import React from 'react';
import { Scan, FileText, Globe, ShieldCheck, BookMarked, Cpu } from 'lucide-react';

const features = [
  {
    title: 'High-Fidelity Scanning',
    description: 'Professional grade digitization that preserves the original layout, typography, and essence of Catholic Classics.',
    icon: Scan,
  },
  {
    title: 'AI-Powered OCR',
    description: 'Advanced Optical Character Recognition to make scanned texts searchable, editable, and accessible for modern research.',
    icon: FileText,
  },
  {
    title: 'Global Accessibility',
    description: 'Transforming physical archives in Nigeria into cloud-based libraries accessible to students and scholars worldwide.',
    icon: Globe,
  },
  {
    title: 'Secure Archiving',
    description: 'Enterprise-grade encryption and redundant backups to ensure these sacred texts are never lost to time.',
    icon: ShieldCheck,
  },
  {
    title: 'Theological Precision',
    description: 'Specialized handling for religious texts, ensuring footnotes and ecclesiastical notations are preserved perfectly.',
    icon: BookMarked,
  },
  {
    title: 'Rapid Turnaround',
    description: 'Streamlined workflow from physical intake to digital delivery, scaling the digitization of entire libraries.',
    icon: Cpu,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Professional Digitization Infrastructure
          </h2>
          <p className="text-slate-600 text-lg">
            We combine cutting-edge AI technology with a deep respect for physical archives to bring 
            Criterion Educational Foundation's library into the digital age.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl border border-slate-100 hover:border-[#006400] transition-colors group">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#006400] transition-colors">
                <feature.icon className="w-6 h-6 text-[#006400] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};