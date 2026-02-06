import React, { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, MapPin, Flame, Footprints, Droplets } from 'lucide-react';
import { NEARBY_RESTAURANTS } from '../constants';
import { Restaurant } from '../types';

interface Props {
  onBack: () => void;
}

export const EcoWalk: React.FC<Props> = ({ onBack }) => {
  const [activeWalk, setActiveWalk] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0); // in meters
  
  // Simulated walking logic
  useEffect(() => {
      let interval: any;
      if (activeWalk) {
          interval = setInterval(() => {
              setSteps(prev => prev + 2);
              setDistance(prev => prev + 1.5);
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [activeWalk]);

  const calories = Math.floor(steps * 0.04);
  const fuelSaved = (distance / 1000 * 0.05).toFixed(3); // Litres approx

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors relative">
        {/* Background Map Effect */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/San_Francisco_Map_Lighter_Grayscale.jpg')] bg-cover"></div>

        <div className="relative z-10 flex flex-col h-screen">
            {/* Header */}
            <div className="p-4 flex items-center gap-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 border-b border-green-100 dark:border-green-900">
                <button onClick={onBack} className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
                <div>
                    <h1 className="text-xl font-bold flex items-center gap-2 text-green-700 dark:text-green-400">
                        Walk for Biryani <Leaf className="w-5 h-5 fill-current" />
                    </h1>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Save fuel. Earn flavor.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-6 text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                        <div>
                            <p className="text-3xl font-bold">{Math.floor(distance)}m</p>
                            <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold mt-1">Distance</p>
                        </div>
                        <div className="border-l border-white/20">
                            <p className="text-3xl font-bold">{calories}</p>
                            <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold mt-1">Kcal Burned</p>
                        </div>
                        <div className="border-l border-white/20">
                            <p className="text-3xl font-bold">{fuelSaved}L</p>
                            <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold mt-1">Fuel Saved</p>
                        </div>
                    </div>

                    {!activeWalk ? (
                        <button 
                            onClick={() => setActiveWalk(true)}
                            className="w-full bg-white text-green-700 font-bold py-3 rounded-xl shadow-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                        >
                           <Footprints className="w-5 h-5" /> Start Walking
                        </button>
                    ) : (
                        <button 
                            onClick={() => setActiveWalk(false)}
                            className="w-full bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-600 transition-colors animate-pulse"
                        >
                            Stop Tracking
                        </button>
                    )}
                </div>

                {/* Points Logic */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Milestone Rewards</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 opacity-50">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold">10</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Walk 500m</p>
                                <p className="text-xs text-gray-500">Unlocks +10 Points</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 ${distance < 500 ? 'opacity-50' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold">25</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Walk 1 km</p>
                                <p className="text-xs text-gray-500">Unlocks +25 Points</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 ${distance < 1000 ? 'opacity-50' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 font-bold">50</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Walk 1.5 km</p>
                                <p className="text-xs text-gray-500">Unlocks +50 Points & Free Topping</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nearby Walkable Outlets */}
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" /> Walkable Outlets
                    </h3>
                    <div className="space-y-3">
                        {NEARBY_RESTAURANTS.filter(r => r.walkable).map((rest) => (
                            <div key={rest.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 flex gap-3 items-center group cursor-pointer hover:border-green-300 transition-colors">
                                <img src={rest.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt={rest.name} />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{rest.name}</h4>
                                    <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-1 flex items-center gap-1">
                                        <Footprints className="w-3 h-3" /> {rest.distance} away
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-gray-400 mb-1">Earn</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">+25 pts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};