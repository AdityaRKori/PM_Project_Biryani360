import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Crown } from 'lucide-react';
import { LEADERBOARD_DATA } from '../constants';

interface Props {
  onBack: () => void;
}

export const Leaderboard: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'EXPLORER' | 'SPICE' | 'REVIEWER'>('EXPLORER');

  const getFilteredData = () => {
      // For mock purposes, just shuffling/filtering mock data
      if (activeTab === 'EXPLORER') return LEADERBOARD_DATA;
      if (activeTab === 'SPICE') return LEADERBOARD_DATA.filter(d => d.type === 'SPICE' || d.type === 'EXPLORER').reverse();
      return LEADERBOARD_DATA.slice(0, 3);
  };

  const currentData = getFilteredData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <div className="bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6 pb-12 sticky top-0 z-10">
            <div className="flex items-center gap-4 mb-6">
                 <button onClick={onBack} className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-md transition-colors">
                     <ArrowLeft className="w-6 h-6" />
                 </button>
                 <h1 className="text-xl font-bold">Hall of Fame</h1>
            </div>

            {/* Top 3 Podium Visual (Mock) */}
            <div className="flex justify-center items-end gap-4 mb-4">
                <div className="flex flex-col items-center">
                    <img src={currentData[1]?.avatar} className="w-14 h-14 rounded-full border-2 border-gray-300 mb-2" />
                    <div className="h-16 w-16 bg-gray-400/30 rounded-t-lg flex items-center justify-center font-bold">2</div>
                </div>
                <div className="flex flex-col items-center">
                    <Crown className="w-6 h-6 text-yellow-400 mb-1 animate-bounce" />
                    <img src={currentData[0]?.avatar} className="w-20 h-20 rounded-full border-4 border-yellow-400 mb-2 shadow-lg shadow-yellow-500/20" />
                    <div className="h-24 w-20 bg-yellow-500/30 rounded-t-lg flex items-center justify-center font-bold text-2xl">1</div>
                </div>
                <div className="flex flex-col items-center">
                    <img src={currentData[2]?.avatar} className="w-14 h-14 rounded-full border-2 border-orange-700 mb-2" />
                    <div className="h-12 w-16 bg-orange-700/30 rounded-t-lg flex items-center justify-center font-bold">3</div>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 -mt-6 rounded-t-3xl relative z-20 min-h-[60vh] p-4">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
                {[
                    { id: 'EXPLORER', label: 'Top Explorers', icon: '🌍' },
                    { id: 'SPICE', label: 'Spice Masters', icon: '🌶️' },
                    { id: 'REVIEWER', label: 'Top Reviewers', icon: '✍️' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border
                            ${activeTab === tab.id 
                                ? 'bg-indigo-600 border-indigo-600 text-white' 
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}
                        `}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-3">
                {currentData.map((user, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                        <span className="font-bold text-gray-400 w-6">#{user.rank}</span>
                        <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white">{user.name}</h4>
                            <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-bold">{user.badge}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-indigo-600 dark:text-indigo-400">{user.points}</span>
                            <span className="text-[10px] text-gray-400">PTS</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};