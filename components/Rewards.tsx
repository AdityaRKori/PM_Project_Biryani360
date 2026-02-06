import React from 'react';
import { ArrowLeft, Leaf, Lock, Gift, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const Rewards: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 text-white p-6 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
                <button onClick={onBack} className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-md mb-6 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-300" />
                    <span className="font-bold tracking-wide uppercase text-sm text-green-100">Eco Points</span>
                </div>
                <h1 className="text-5xl font-bold mb-2">120</h1>
                <p className="opacity-90">Keep walking to earn more!</p>
            </div>
        </div>

        <div className="px-6 -mt-16 relative z-20 pb-10">
            {/* Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-lg">Silver Tier</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">380 points to Gold</span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 w-[30%] rounded-full"></div>
                </div>
            </div>

            <h3 className="font-bold text-lg mb-4 pl-1">Redeem Rewards</h3>
            <div className="space-y-4">
                {[
                    { title: 'Free Raita', cost: 100, locked: false },
                    { title: '₹50 Off Coupon', cost: 250, locked: true },
                    { title: 'Free Dessert', cost: 500, locked: true },
                    { title: 'Biryani Master T-Shirt', cost: 1000, locked: true },
                ].map((reward, i) => (
                    <div key={i} className={`bg-white dark:bg-gray-800 p-4 rounded-xl border flex items-center justify-between group
                        ${reward.locked ? 'border-gray-100 dark:border-gray-700 opacity-60' : 'border-green-200 dark:border-green-900 shadow-sm cursor-pointer hover:border-green-400'}
                    `}>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                ${reward.locked ? 'bg-gray-100 dark:bg-gray-700 text-gray-400' : 'bg-green-50 dark:bg-green-900/30 text-green-600'}
                            `}>
                                {reward.locked ? <Lock className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{reward.title}</h4>
                                <p className="text-xs font-bold text-green-600 dark:text-green-400">{reward.cost} pts</p>
                            </div>
                        </div>
                        {!reward.locked && <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};