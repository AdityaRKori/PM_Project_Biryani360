
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, ShieldCheck, Truck, Users, Globe } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  type: 'ABOUT' | 'SERVICES';
  onBack: () => void;
  onError: (err: any) => void;
}

export const InfoPage: React.FC<Props> = ({ type, onBack, onError }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      // Randomly simulate a crash for demonstration of error handling
      if (Math.random() > 0.9) {
        onError(new Error("Failed to load content content_id_x99"));
      } else {
        setLoading(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [type, onError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 text-saffron-500 animate-spin mx-auto" />
          <p className="text-gray-500 text-sm animate-pulse">Fetching heritage data...</p>
        </div>
      </div>
    );
  }

  const content = type === 'ABOUT' ? {
    title: "Our Story",
    subtitle: "Preserving the Art of Dum",
    text: "Biryani360 was born from a simple obsession: to find the perfect pot of Biryani. Not the mass-produced, oily rice you find everywhere, but the authentic, slow-cooked masterpiece known as Dum Pukht. We partner with heritage kitchens that have guarded their recipes for generations.",
    stats: [
        { label: "Kitchens", val: "50+" },
        { label: "Cities", val: "3" },
        { label: "Orders", val: "100k+" }
    ]
  } : {
    title: "Our Services",
    subtitle: "More than just Delivery",
    text: "We offer a suite of services designed for the connoisseur. From eco-friendly pickup options that reward you for saving fuel, to exclusive catering for your royal feasts.",
    stats: [
        { label: "Delivery", val: "30 min" },
        { label: "Catering", val: "Events" },
        { label: "Classes", val: "Live" }
    ]
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-50 font-sans">
      <div className="sticky top-0 bg-charcoal-950/90 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="font-bold uppercase tracking-wider text-xs text-gray-500">{type}</span>
      </div>

      <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-12 animate-fade-in">
         <div className="text-center space-y-4">
             <Logo size="lg" className="mx-auto mb-8 opacity-80" />
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{content.title}</h1>
             <p className="text-saffron-500 font-bold uppercase tracking-widest text-sm">{content.subtitle}</p>
         </div>

         <div className="bg-charcoal-900 p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <p className="text-lg text-gray-300 leading-relaxed relative z-10">
                 {content.text}
             </p>
         </div>

         <div className="grid grid-cols-3 gap-4">
             {content.stats.map((s, i) => (
                 <div key={i} className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
                     <p className="text-2xl font-bold text-white">{s.val}</p>
                     <p className="text-xs text-gray-500 uppercase font-bold mt-1">{s.label}</p>
                 </div>
             ))}
         </div>

         <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4">
                <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
                <div>
                    <h3 className="font-bold text-white mb-1">Authenticity Guaranteed</h3>
                    <p className="text-sm text-gray-400">Every kitchen is vetted for hygiene and heritage.</p>
                </div>
            </div>
            <div className="flex items-start gap-4 p-4">
                <Truck className="w-8 h-8 text-blue-500 shrink-0" />
                <div>
                    <h3 className="font-bold text-white mb-1">Temperature Controlled</h3>
                    <p className="text-sm text-gray-400">Delivered hot, straight from the Handi.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
