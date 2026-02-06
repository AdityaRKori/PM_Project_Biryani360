
import React from 'react';
import { User, ShoppingBag, Leaf, Heart, MessageSquare, HelpCircle, LogOut, X, Moon, Sun, ChevronRight, LayoutDashboard, Wallet, Trophy, Globe, Code, Shield, BookOpen, Bookmark, ZapOff } from 'lucide-react';
import { Logo } from './Logo';
import { Screen } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenFeedback: () => void;
  onSimulateCrash: () => void;
}

export const SideMenu: React.FC<Props> = ({ isOpen, onClose, onNavigate, onLogout, darkMode, toggleDarkMode, onOpenFeedback, onSimulateCrash }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', screen: 'LANDING' as Screen },
    { icon: User, label: 'Profile', screen: 'PROFILE' as Screen },
    { icon: ShoppingBag, label: 'My Orders', screen: 'PAST_ORDERS' as Screen },
    { icon: Wallet, label: 'Points Wallet', screen: 'WALLET' as Screen, badge: '185' },
    { icon: Leaf, label: 'Eco Walk', screen: 'ECO_WALK' as Screen },
    { icon: BookOpen, label: 'Recipes & Secrets', screen: 'RECIPES' as Screen },
    { icon: Bookmark, label: 'My Saved Recipes', screen: 'RECIPES' as Screen, subItem: true },
    { icon: Globe, label: 'World & Fusion', screen: 'WORLD_FUSION' as Screen },
    { icon: Trophy, label: 'Leaderboard', screen: 'LEADERBOARD' as Screen },
    { icon: Heart, label: 'Favorites', screen: 'FAVORITES' as Screen },
    { icon: HelpCircle, label: 'Help & Support', screen: 'SUPPORT' as Screen },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />

      {/* Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-gray-900 text-gray-100 z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
         {/* Header */}
         <div className="p-6 bg-gradient-to-br from-saffron-600 to-saffron-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
            
            <div className="flex justify-between items-start mb-6">
                <Logo size="sm" variant="light" />
                <button onClick={onClose} className="bg-black/20 p-2 rounded-full hover:bg-black/40 transition-colors">
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-white p-1">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover" alt="Profile" />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-white">Rohan Sharma</h2>
                    <p className="text-saffron-100 text-sm font-medium">+91 98765 43210</p>
                </div>
            </div>
         </div>

         {/* Menu Items */}
         <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Menu</p>
                {menuItems.map((item, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => {
                            onNavigate(item.screen);
                            onClose();
                        }}
                        className={`w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-800 rounded-xl transition-all group mb-1
                            ${item.subItem ? 'pl-8 opacity-90' : ''}
                        `}
                    >
                        <div className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors">
                            <item.icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${item.subItem ? 'w-4 h-4' : ''} text-gray-400 group-hover:text-saffron-500`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        {/* @ts-ignore */}
                        {item.badge ? (
                            // @ts-ignore
                            <span className="text-[10px] bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 px-2 py-0.5 rounded-full font-bold">{item.badge}</span>
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
                        )}
                    </button>
                ))}
            </div>

            <div className="px-4 mt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Preferences</p>
                
                <button 
                    onClick={onOpenFeedback}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-800 rounded-xl transition-all group mb-1"
                >
                     <div className="flex items-center gap-4 text-gray-300 group-hover:text-white">
                        <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-saffron-500" />
                        <span className="font-medium text-sm">Send Feedback</span>
                     </div>
                </button>

                <div className="px-4 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-300">
                        {darkMode ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                        <span className="font-medium text-sm">Dark Mode</span>
                    </div>
                    <button 
                        onClick={toggleDarkMode}
                        className={`w-12 h-6 rounded-full p-1 transition-colors relative ${darkMode ? 'bg-purple-600' : 'bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                    <button 
                        onClick={() => {
                            onNavigate('INTERNAL_CHECKLIST');
                            onClose();
                        }}
                        className="px-3 py-3 bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition-colors group"
                    >
                        <Code className="w-5 h-5 text-gray-500 group-hover:text-white" />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-white">Dev Check</span>
                    </button>
                    <button 
                        onClick={onSimulateCrash}
                        className="px-3 py-3 bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-red-900/20 transition-colors group"
                    >
                        <ZapOff className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-red-400">Sim Crash</span>
                    </button>
                </div>
            </div>
         </div>

         {/* Footer */}
         <div className="p-6 border-t border-gray-800">
             <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-3 rounded-xl transition-colors font-medium text-sm"
             >
                 <LogOut className="w-5 h-5" /> Logout
             </button>
             <p className="text-center text-[10px] text-gray-600 mt-4">Biryani360 v1.3.0 • Made with ❤️</p>
         </div>
      </div>
    </>
  );
};
