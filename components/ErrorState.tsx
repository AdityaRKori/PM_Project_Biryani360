
import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
  errorId?: string;
  onRetry: () => void;
  onHome: () => void;
}

export const ErrorState: React.FC<Props> = ({ errorId, onRetry, onHome }) => {
  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="bg-red-900/10 p-6 rounded-full mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
        Oops — can't open this right now.
      </h2>
      
      <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
        Something went wrong while loading this page. The spices might be mixing, or the pot is too hot.
      </p>

      <div className="flex gap-4 w-full max-w-xs">
        <button 
          onClick={onRetry}
          className="flex-1 bg-saffron-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-saffron-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-saffron-700"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
        <button 
          onClick={onHome}
          className="flex-1 bg-charcoal-800 text-white py-3 rounded-xl font-bold border border-white/10 active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-charcoal-700"
        >
          <Home className="w-4 h-4" /> Home
        </button>
      </div>

      {errorId && (
        <div className="mt-12 p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-gray-600">
          Debug info: ID_{errorId}
        </div>
      )}
    </div>
  );
};
