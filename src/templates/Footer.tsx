import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-bold text-2xl mb-6">
              Book Digitization Platform
            </div>
            <p className="max-w-sm text-slate-400 leading-relaxed">
              A dedicated initiative by Origin Eyes Inc. (501c3) to support the 
              Criterion Educational Foundation in preserving Catholic Classics through 
              advanced digitization technology.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Product</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">About Origin Eyes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Criterion Foundation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Book Digitization Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};