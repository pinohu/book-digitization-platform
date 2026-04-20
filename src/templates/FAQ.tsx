import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does the digitization process work?",
    answer: "Physical books are collected from the Criterion Educational Foundation, scanned using high-resolution overhead scanners, processed through our AI OCR pipeline, and delivered as searchable digital files."
  },
  {
    question: "What is the turnaround time per book?",
    answer: "Depending on the length and condition of the book, most titles are digitized and quality-checked within 3-5 business days after receipt."
  },
  {
    question: "Will the original physical books be returned?",
    answer: "Yes, we treat every physical copy with the utmost care. All physical books are returned to the foundation once the digital master is verified."
  },
  {
    question: "In what formats will the books be delivered?",
    answer: "We provide a comprehensive package including a high-resolution PDF (for archiving) and an ePub/Text file (for mobile and web accessibility)."
  },
  {
    question: "Is the $5 fee flat regardless of book size?",
    answer: "For standard Catholic Classics, the $5 fee is flat. For exceptionally large volumes (over 1,000 pages), we will provide a custom quote prior to scanning."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about our partnership with Criterion Educational Foundation.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-slate-600 border-t border-slate-100 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};