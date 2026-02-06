
import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, FileText, Shield, ArrowRight } from 'lucide-react';
import { Screen } from '../types';

interface Props {
    onNavigate?: (screen: Screen) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  const handleNav = (screen: Screen, e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigate) onNavigate(screen);
  };

  return (
    <footer className="bg-black text-gray-400 py-10 border-t border-white/10 font-sans text-sm relative z-30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: About */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">About</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => handleNav('ABOUT', e)} className="hover:text-saffron-500 transition-colors">Our Story</a></li>
              <li><a href="#" onClick={(e) => handleNav('ABOUT', e)} className="hover:text-saffron-500 transition-colors">Culinary Heritage</a></li>
              <li><a href="#" className="hover:text-saffron-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-saffron-500 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => handleNav('SERVICES', e)} className="hover:text-saffron-500 transition-colors">Delivery</a></li>
              <li><a href="#" onClick={(e) => handleNav('SERVICES', e)} className="hover:text-saffron-500 transition-colors">Catering</a></li>
              <li><a href="#" onClick={(e) => handleNav('SERVICES', e)} className="hover:text-saffron-500 transition-colors">Masterclasses</a></li>
              <li><a href="#" onClick={(e) => handleNav('ECO_WALK', e)} className="hover:text-saffron-500 transition-colors">Eco-Pickup</a></li>
            </ul>
          </div>

          {/* Col 3: Help */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Help & Support</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-3 h-3" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="w-3 h-3" /> help@biryani360.com</li>
              <li><a href="#" className="hover:text-white flex items-center gap-1"><FileText className="w-3 h-3" /> Product Doc (PDF)</a></li>
              <li><a href="#" onClick={(e) => handleNav('TERMS', e)} className="hover:text-white flex items-center gap-1"><Shield className="w-3 h-3" /> Terms & Privacy</a></li>
            </ul>
          </div>

          {/* Col 4: Contact / CTA */}
          <div className="col-span-2 md:col-span-1">
             <div className="bg-charcoal-900 border border-white/10 rounded-xl p-4">
                 <p className="text-xs font-bold text-saffron-500 uppercase tracking-wider mb-2">Internal Access</p>
                 <button className="w-full bg-white text-black font-bold py-2 rounded-lg text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    Join Biryani360 Beta <ArrowRight className="w-3 h-3" />
                 </button>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-4">
                <Logo size="sm" variant="light" className="opacity-50" />
                <p>For demonstration purpose: demo features simulated. Jurisdiction: India.</p>
            </div>
            <p>&copy; 2024 Biryani360. Developed by Aditya — PGDM AI & DS.</p>
        </div>
      </div>
    </footer>
  );
};
