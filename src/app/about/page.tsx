// src/app/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold mb-4 text-stone-800">Our Sacred Mission</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Bridging the gap between the physical archives of Nigeria and the global digital community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-stone-700 leading-relaxed">
            <p>
              The <span className="font-bold text-stone-900">Criterion Educational Foundation</span> has long served as a beacon of knowledge in Nigeria, publishing physical Catholic Classics that provide spiritual and intellectual guidance.
            </p>
            <p>
              However, physical books are subject to the elements—humidity, wear, and the limitations of geography. To ensure these works survive for generations to come, we have partnered with a US-based 501c3 non-profit to facilitate a comprehensive digitization effort.
            </p>
            <p className="font-medium italic text-amber-800">
              Our goal is not simply to "scan" books, but to liberate the wisdom contained within them, making them available to scholars, students, and the faithful across the globe.
            </p>
          </div>
          <div className="bg-stone-200 aspect-square rounded-2xl flex items-center justify-center text-stone-400 italic text-center p-8 border-4 border-white shadow-lg">
            [Image: Heritage Library Collection]
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Why This Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-amber-700 font-bold text-3xl mb-2">Preservation</div>
              <p className="text-stone-500 text-sm">Preventing the loss of rare texts due to physical degradation.</p>
            </div>
            <div className="text-center">
              <div className="text-amber-700 font-bold text-3xl mb-2">Democratization</div>
              <p className="text-stone-500 text-sm">Removing the barrier of physical location for theological study.</p>
            </div>
            <div className="text-center">
              <div className="text-amber-700 font-bold text-3xl mb-2">Legacy</div>
              <p className="text-stone-500 text-sm">Creating a permanent, searchable digital legacy for the Foundation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}