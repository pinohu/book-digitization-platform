import React from 'react';
import { BookOpen } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#006400] rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Book Digitization Platform
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-[#006400] transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-[#006400] transition-colors">Pricing</a>
          <a href="#docs" className="text-sm font-medium text-slate-600 hover:text-[#006400] transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="text-sm font-bold bg-[#006400] text-white px-5 py-2.5 rounded-lg hover:bg-green-800 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};