
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { Biryani } from '../types';
import { Flame, Star, ShoppingBag, Plus } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface Props {
  onAddToCart: (item: Biryani) => void;
  cartCount: number;
  onGoToCart: () => void;
}

export const Menu: React.FC<Props> = ({ onAddToCart, cartCount, onGoToCart }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');

  const filteredItems = MENU_ITEMS.filter(item => {
    if (filterType === 'VEG') return item.isVeg;
    if (filterType === 'NON_VEG') return !item.isVeg;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4 shadow-sm">
        <div className="flex justify-between items-center mb-4 pr-12"> {/* pr-12 to make space for global menu trigger */}
            <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Discover</h2>
            <p className="text-xs text-saffron-600 font-medium tracking-wide uppercase">Premium Selection</p>
            </div>
            <button 
                onClick={onGoToCart} 
                className="relative p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-saffron-50 dark:hover:bg-saffron-900/20 transition-colors"
            >
            <ShoppingBag className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
                </span>
            )}
            </button>
        </div>

        {/* Veg/Non-Veg Toggle Slider */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex relative">
            {/* Sliding Background */}
            <div 
                className="absolute top-1 bottom-1 w-1/3 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                style={{ 
                    left: filterType === 'ALL' ? '4px' : filterType === 'VEG' ? '33.33%' : 'calc(66.66% - 4px)' 
                }}
            ></div>

            {['ALL', 'VEG', 'NON_VEG'].map((type) => (
                <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={`flex-1 relative z-10 py-1.5 text-xs font-bold text-center rounded-lg transition-colors
                        ${filterType === type ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}
                    `}
                >
                    {type === 'ALL' ? 'All Items' : type === 'VEG' ? 'Veg Only' : 'Non-Veg'}
                </button>
            ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-4 space-y-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className={`
              relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500 group cursor-pointer card-vip
              ${activeId === item.id ? 'ring-2 ring-saffron-500 shadow-xl scale-[1.02]' : ''}
            `}
            onClick={() => setActiveId(activeId === item.id ? null : item.id)}
          >
            {/* Image Container */}
            <div className="h-64 w-full relative overflow-hidden bg-charcoal-800">
              <SmartImage 
                src={activeId === item.id ? item.hoverImageUrl : item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                query={item.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Veg/Non-Veg Indicator on Card */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm z-10">
                   <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5`}>
                        <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                   </div>
              </div>

              {/* Steam Animation (Only active state) */}
              {activeId === item.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none flex justify-center items-end opacity-60">
                   <div className="w-16 h-16 bg-white blur-2xl rounded-full animate-steam"></div>
                   <div className="w-20 h-20 bg-white blur-3xl rounded-full animate-steam delay-75 absolute bottom-10 -ml-8"></div>
                   <div className="w-12 h-12 bg-white blur-xl rounded-full animate-steam delay-150 absolute bottom-4 ml-8"></div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4">
                 <div className="flex justify-between items-end mb-1">
                   <h3 className="text-2xl font-bold text-white drop-shadow-md">{item.name}</h3>
                   <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                      {item.rating} <Star className="w-3 h-3 fill-current" />
                   </div>
                 </div>
                 <p className="text-gray-300 text-sm font-medium line-clamp-1">{item.style} Style</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5">
              {activeId === item.id ? (
                <div className="animate-fade-in space-y-4">
                  <p className="text-saffron-700 dark:text-saffron-400 font-serif italic text-lg leading-snug">
                    "{item.sensoryDescription}"
                  </p>
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Spice Meter</span>
                     <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                        {/* Custom Rice Slider Representation for Read-Only View */}
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-red-600" 
                          style={{ width: `${item.spiceLevel * 10}%` }}
                        ></div>
                     </div>
                     <Flame className="w-4 h-4 text-red-500 fill-red-500" />
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
              )}

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item);
                  }}
                  className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg active:scale-95 btn-gold"
                >
                  Add <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-400">
                <p>No items found for this selection.</p>
            </div>
        )}
      </div>
    </div>
  );
};
