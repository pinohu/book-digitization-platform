// src/app/contact/page.tsx
"use client";
import React, { useState } from 'react';
import { Send, Book, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div>
            <h1 className="text-4xl font-serif font-bold mb-6 text-stone-800">Let's Preserve Your Library</h1>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed">
              Whether you have a single volume or a thousand-book archive, we provide the careful handling and technical precision required for Catholic Classics.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full border border-stone-200 text-amber-700">
                  <Mail size={20} />
                </div>
                <span className="text-stone-700 font-medium">contact@criterion-digitize.org</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full border border-stone-200 text-amber-700">
                  <Phone size={20} />
                </div>
                <span className="text-stone-700 font-medium">+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full border border-stone-200 text-amber-700">
                  <Book size={20} />
                </div>
                <span className="text-stone-700 font-medium">Operating in USA & Nigeria</span>
              </div>
            </div>

            <div className="mt-12 p-6 bg-amber-100 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-amber-900 mb-2">Note on Handling</h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                All books are handled by trained technicians using archival-grade gloves and non-destructive capture equipment. We treat every page with the reverence it deserves.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-stone-800">Request Received</h3>
                <p className="text-stone-600">Our archival team will review your request and contact you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Estimated Number of Books</label>
                  <input required type="number" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="e.g. 50" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Book Condition</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all">
                    <option>Excellent / Modern</option>
                    <option>Good / Slight Wear</option>
                    <option>Fragile / Antique</option>
                    <option>Requires Restoration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Additional Details</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="Tell us about the collection..."></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-amber-700 text-white rounded-xl font-bold text-lg hover:bg-amber-800 transition-all flex items-center justify-center gap-2">
                  Submit Request <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}