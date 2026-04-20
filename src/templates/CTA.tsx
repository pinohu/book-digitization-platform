import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-[#006400] rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Preserve Your Library?
            </h2>
            <p className="text-green-100 text-lg mb-10 opacity-90">
              Join us in our mission to digitize the physical Catholic Classics of 
              the Criterion Educational Foundation and share them with the world.
            </p>
            <button className="px-8 py-4 bg-white text-[#006400] rounded-lg font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2 mx-auto">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32" />
        </div>
      </div>
    </section>
  );
};