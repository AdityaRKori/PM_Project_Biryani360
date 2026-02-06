import React, { useState, useRef, useEffect } from 'react';
import { TERMS_TEXT } from '../constants';
import { ChevronDown, CheckCircle2, Shield, Info } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onAccept: () => void;
}

export const Terms: React.FC<Props> = ({ onAccept }) => {
  const [showFull, setShowFull] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Allow a small buffer (50px) for ease of hitting the bottom
      if (scrollHeight - scrollTop <= clientHeight + 50) { 
        setCanAccept(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-lux-gradient text-cream-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      
      {/* --- Bubbles / Light Sweep Background --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <style>{`
           @keyframes drift { 
             from { transform: translateY(110vh) scale(0.8); opacity: 0; } 
             20% { opacity: 0.08; }
             to { transform: translateY(-20vh) scale(1.5); opacity: 0; } 
           }
           .bubble {
             position: absolute;
             bottom: -100px;
             background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,153,51,0.05) 100%);
             border-radius: 50%;
             animation: drift 20s linear infinite;
             opacity: 0; /* Start hidden */
           }
           @media (prefers-reduced-motion: reduce) {
             .bubble { animation: none; display: none; }
           }
         `}</style>
         {[
            { size: 100, left: 10, delay: 0, duration: 15 },
            { size: 150, left: 25, delay: 5, duration: 25 },
            { size: 80, left: 45, delay: 2, duration: 18 },
            { size: 200, left: 60, delay: 8, duration: 30 },
            { size: 120, left: 80, delay: 12, duration: 22 },
            { size: 90, left: 90, delay: 4, duration: 14 }
         ].map((b, i) => (
            <div 
              key={i} 
              className="bubble"
              style={{
                left: `${b.left}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`
              }}
            />
         ))}
      </div>

      {!showFull ? (
        <div className="w-full max-w-md z-10 flex flex-col items-center text-center space-y-8 animate-fade-in">
          
          {/* Logo Section */}
          <div className="relative">
            <div className="bg-charcoal-900/50 p-8 rounded-full ring-1 ring-white/10 backdrop-blur-md shadow-2xl">
              <Logo size="xl" variant="light" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-max">
                <span className="bg-gold-500 text-charcoal-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Info className="w-3 h-3" /> Student Project — Demo
                </span>
            </div>
          </div>
          
          <div className="space-y-4 max-w-sm">
            <h1 className="text-2xl font-serif font-bold text-cream-50">Terms & Conditions</h1>
            
            <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-xl text-left">
                <p className="text-saffron-200 text-xs leading-relaxed font-medium flex gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    This prototype is a student project and for demonstration only. Features such as payments and live delivery tracking are simulated. Not for commercial use.
                </p>
            </div>

            <p className="text-gray-400 text-sm">
              Please review and accept our policies to start your premium biryani journey.
            </p>
          </div>

          <button 
            onClick={() => setShowFull(true)}
            className="w-full py-4 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-saffron-900/20 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:ring-offset-2 focus:ring-offset-charcoal-900"
            aria-label="View Full Agreement"
          >
            View Full Agreement
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-slide-up z-20 backdrop-blur-xl" style={{ backgroundColor: '#1a1411f2' }}> {/* Slightly darkened saffron/charcoal mix */}
          
          {/* Modal Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <h2 className="font-serif font-bold text-lg text-cream-50 flex items-center gap-2">
                <Shield className="w-5 h-5 text-saffron-500" /> User Agreement
            </h2>
            <div className="text-[10px] font-mono text-saffron-400 bg-saffron-900/30 px-2 py-1 rounded border border-saffron-500/20">STUDENT_BUILD_v1</div>
          </div>

          {/* Scroll Content */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 p-6 overflow-y-auto custom-scrollbar"
          >
            <div className="text-[#FFF7EE] opacity-95 text-[15px] leading-[1.6] space-y-6 font-light">
                <div className="bg-white/5 p-4 rounded-lg border-l-2 border-saffron-500 mb-6">
                    <p className="text-xs text-saffron-200 uppercase font-bold mb-1">Disclaimer</p>
                    <p className="text-sm italic">This platform is a student project and prototype. Features are simulated for learning and demonstration purposes.</p>
                </div>
                {TERMS_TEXT.split('\n').map((line, i) => {
                    const cleanLine = line.replace(/\*\*/g, '').trim();
                    if(!cleanLine) return null;
                    return (
                        <p key={i} className={line.startsWith('**') ? 'font-bold text-saffron-100 text-lg mt-6' : ''}>
                            {cleanLine}
                        </p>
                    )
                })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/10 bg-black/60 space-y-5">
            <div className="flex flex-col gap-3">
              <label className={`flex items-center gap-3 cursor-pointer group ${!canAccept ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="relative">
                    <input 
                    type="checkbox" 
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="peer sr-only"
                    disabled={!canAccept}
                    />
                    <div className="w-5 h-5 border-2 border-gray-500 rounded bg-transparent peer-checked:bg-saffron-500 peer-checked:border-saffron-500 transition-colors"></div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">I agree to the Terms & Conditions</span>
              </label>
              
              <label className={`flex items-center gap-3 cursor-pointer group ${!canAccept ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="relative">
                    <input 
                    type="checkbox" 
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="peer sr-only"
                    disabled={!canAccept}
                    />
                    <div className="w-5 h-5 border-2 border-gray-500 rounded bg-transparent peer-checked:bg-saffron-500 peer-checked:border-saffron-500 transition-colors"></div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">I agree to the Privacy Policy</span>
              </label>
            </div>

            <button
              onClick={onAccept}
              disabled={!canAccept || !agreedTerms || !agreedPrivacy}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg
                ${(!canAccept || !agreedTerms || !agreedPrivacy)
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                  : 'bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-400 hover:to-saffron-500 shadow-saffron-500/30'
                }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              Accept & Continue
            </button>
            {!canAccept && (
              <p className="text-[10px] text-center text-gray-500 animate-pulse">
                Please scroll to the bottom of the agreement to enable acceptance.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};