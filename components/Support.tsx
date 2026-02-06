import React from 'react';
import { ArrowLeft, Phone, Mail, ChevronDown } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const Support: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
       <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Help & Support</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6">How can we help you?</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Phone className="w-8 h-8 text-saffron-500" />
                  <span className="font-bold text-sm">Call Us</span>
              </button>
              <button className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Mail className="w-8 h-8 text-blue-500" />
                  <span className="font-bold text-sm">Email Us</span>
              </button>
          </div>

          <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
              {[
                  "Where is my order?",
                  "How to cancel my order?",
                  "Refund policy for cancelled orders",
                  "I found a bone in my boneless biryani",
                  "My coupon code isn't working"
              ].map((q, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:border-gray-300">
                      <span className="text-sm font-medium">{q}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};