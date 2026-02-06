import React, { useState } from 'react';
import { ArrowLeft, Clock, Lock, Unlock, Gift, ChevronRight, TrendingUp } from 'lucide-react';
import { WALLET_HISTORY } from '../constants';

interface Props {
  onBack: () => void;
}

export const Wallet: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'REDEEM' | 'HISTORY'>('REDEEM');
  const totalPoints = 185;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-saffron-600 to-red-700 p-6 pb-24 text-white relative overflow-hidden rounded-b-[2.5rem] shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
             
             <div className="relative z-10">
                 <button onClick={onBack} className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-md mb-6 transition-colors">
                     <ArrowLeft className="w-6 h-6" />
                 </button>
                 <p className="text-saffron-100 font-medium text-sm uppercase tracking-wider mb-1">Biryani Points Wallet</p>
                 <div className="flex items-baseline gap-1">
                    <h1 className="text-6xl font-bold">{totalPoints}</h1>
                    <span className="text-lg font-medium opacity-80">pts</span>
                 </div>
                 
                 {/* Progress Ring Simulation */}
                 <div className="mt-6 flex items-center gap-4 bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold mb-1 opacity-90">
                            <span>Silver Member</span>
                            <span>Gold (500 pts)</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 w-[37%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                        </div>
                    </div>
                 </div>
             </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 -mt-8 relative z-20">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg flex border border-gray-100 dark:border-gray-700">
                <button 
                    onClick={() => setActiveTab('REDEEM')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'REDEEM' ? 'bg-saffron-50 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 shadow-sm' : 'text-gray-500'}`}
                >
                    Redeem Rewards
                </button>
                <button 
                    onClick={() => setActiveTab('HISTORY')}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'HISTORY' ? 'bg-saffron-50 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 shadow-sm' : 'text-gray-500'}`}
                >
                    History
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
            {activeTab === 'REDEEM' ? (
                <div className="space-y-4 animate-fade-in">
                    {[
                        { title: 'Free Extra Raita', cost: 100, icon: '🥣' },
                        { title: 'Free Soft Drink', cost: 150, icon: '🥤' },
                        { title: '₹100 Off Coupon', cost: 300, icon: '🎫' },
                        { title: 'Free Chicken Biryani', cost: 800, icon: '🍗' },
                    ].map((reward, i) => {
                        const isLocked = totalPoints < reward.cost;
                        return (
                            <div key={i} className={`bg-white dark:bg-gray-800 p-4 rounded-2xl border flex items-center justify-between group transition-all
                                ${isLocked 
                                    ? 'border-gray-100 dark:border-gray-700 opacity-60 grayscale-[0.5]' 
                                    : 'border-saffron-200 dark:border-saffron-900 shadow-sm hover:shadow-md hover:border-saffron-400 cursor-pointer'}
                            `}>
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl bg-gray-50 dark:bg-gray-700 w-14 h-14 flex items-center justify-center rounded-full">
                                        {reward.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{reward.title}</h4>
                                        <p className={`text-xs font-bold mt-1 ${isLocked ? 'text-gray-400' : 'text-saffron-600'}`}>{reward.cost} Points</p>
                                    </div>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border
                                    ${isLocked ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-saffron-50 border-saffron-200 text-saffron-600'}
                                `}>
                                    {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-4 animate-fade-in">
                    {WALLET_HISTORY.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                ${item.points > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                            `}>
                                {item.points > 0 ? <TrendingUp className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.action}</h4>
                                <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                            </div>
                            <span className={`font-bold text-sm ${item.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {item.points > 0 ? '+' : ''}{item.points}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};