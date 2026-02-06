
import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface Props {
  count: number;
  total: number;
  onClick: () => void;
}

export const FloatingCart: React.FC<Props> = ({ count, total, onClick }) => {
  if (count === 0) return null;

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-50 w-[90%] max-w-sm md:w-auto animate-slide-up cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open cart and proceed to checkout"
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="bg-charcoal-900 text-white p-4 rounded-2xl shadow-premium border border-white/10 flex items-center justify-between gap-6 backdrop-blur-xl hover:scale-105 transition-transform ring-1 ring-white/5">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 p-3 rounded-xl text-white shadow-lg shadow-saffron-900/20">
                <ShoppingBag className="w-5 h-5" />
             </div>
             <span className="absolute -top-2 -right-2 bg-white text-charcoal-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-charcoal-900 shadow-sm">
                {count}
             </span>
          </div>
          <div>
             <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Subtotal</p>
             <p className="text-lg font-bold text-white">₹{total}</p>
          </div>
        </div>
        
        <button className="bg-white text-charcoal-900 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg active:scale-95">
           Checkout <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
