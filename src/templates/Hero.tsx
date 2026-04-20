import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-[#006400] text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Preserving Theological Legacies</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6">
            Digitizing the Wisdom of <span className="text-[#006400]">Catholic Classics</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
            Partnering with Criterion Educational Foundation in Nigeria to transform physical 
            theological texts into high-fidelity digital assets. Ensuring the timeless 
            teachings of the Church are preserved and accessible globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-8 py-4 bg-[#006400] text-white rounded-lg font-semibold hover:bg-green-800 transition-all flex items-center justify-center gap-2">
              Start Digitizing Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition-all">
              View Sample Work
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#006400] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#006400] blur-[120px]" />
      </div>
    </section>
  );
};