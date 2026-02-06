
import React, { useState } from 'react';
import { CartItem } from '../types';
import { TOPPINGS } from '../constants';
import { Trash2, ArrowLeft, Percent, Utensils, Minus, Plus, Flame, ChefHat, ShoppingBag, ArrowRight, Gift, Footprints } from 'lucide-react';
import { Logo } from './Logo';
import { SmartImage } from './SmartImage';

interface Props {
  items: CartItem[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onPlaceOrder: () => void;
  onUpdateItem: (id: string, updates: Partial<CartItem>) => void;
}

export const Cart: React.FC<Props> = ({ items, onBack, onRemove, onPlaceOrder, onUpdateItem }) => {
  const [instructions, setInstructions] = useState('');
  const [cutlery, setCutlery] = useState(false);
  const [walkPickup, setWalkPickup] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const toppingsCost = item.selectedToppings?.reduce((tSum, tId) => tSum + (TOPPINGS.find(t => t.id === tId)?.price || 0), 0) || 0;
    return sum + (item.price + toppingsCost) * item.quantity;
  }, 0);
  
  const gst = Math.round(subtotal * 0.05);
  const deliveryFee = walkPickup ? 0 : 40;
  const discount = 0; // Could be dynamic
  const total = subtotal + gst + deliveryFee - discount;

  // Gamification logic
  const pointsToNextReward = Math.max(0, 800 - subtotal);
  const progressPercent = Math.min(100, (subtotal / 800) * 100);

  const handleSpiceChange = (id: string, val: number) => {
      onUpdateItem(id, { selectedSpiceLevel: val });
  };

  const toggleTopping = (itemId: string, toppingId: string, currentToppings: string[]) => {
      const newToppings = currentToppings.includes(toppingId)
        ? currentToppings.filter(t => t !== toppingId)
        : [...currentToppings, toppingId];
      onUpdateItem(itemId, { selectedToppings: newToppings });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Your Handi</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{items.length} Items</p>
            </div>
        </div>
        <Logo size="sm" className="opacity-50" />
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-32">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-fade-in">
             <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-ping opacity-20"></div>
                <CookingPotEmpty />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your handi is empty 🍲</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">Looks like you haven't added any delicious biryanis yet.</p>
             </div>
             <button 
                onClick={onBack}
                className="px-8 py-3 bg-saffron-600 text-white rounded-full font-bold shadow-lg hover:bg-saffron-700 transition-colors btn-gold"
             >
                Start Ordering
             </button>
          </div>
        ) : (
          <>
            {/* Gamification Progress */}
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">
                        {pointsToNextReward > 0 
                            ? `Add ₹${pointsToNextReward} more for Free Salan!` 
                            : '🎉 You unlocked a Free Reward!'}
                    </span>
                </div>
                <div className="h-2 bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>

            {/* Items List */}
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden card-vip">
                   {/* Item Header */}
                   <div className="p-4 flex gap-4 border-b border-gray-50 dark:border-gray-700">
                        <div className="relative w-20 h-20 shrink-0 bg-charcoal-800 rounded-xl overflow-hidden">
                            <SmartImage src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} query={item.name} />
                            <div className="absolute -top-1 -right-1">
                                <div className={`w-4 h-4 border ${item.isVeg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'} flex items-center justify-center p-0.5 rounded-sm`}>
                                    <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 dark:text-white text-lg leading-tight">{item.name}</h3>
                                <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.style} Style</p>
                            <div className="flex justify-between items-end mt-2">
                                <span className="text-saffron-600 dark:text-saffron-400 font-bold">₹{item.price}</span>
                                
                                {/* Quantity Control */}
                                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg h-8">
                                    <button 
                                        className="w-8 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg"
                                        onClick={() => onUpdateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                    <button 
                                        className="w-8 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg"
                                        onClick={() => onUpdateItem(item.id, { quantity: item.quantity + 1 })}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                   </div>

                   {/* Customization Section */}
                   <div className="bg-gray-50 dark:bg-gray-700/30 p-4 space-y-4">
                        {/* Spice Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-red-500" /> Spice Level
                                </label>
                                <span className="text-xs font-bold bg-white dark:bg-gray-600 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-500 text-red-600 dark:text-red-400">
                                    {item.selectedSpiceLevel || item.spiceLevel}/10
                                </span>
                            </div>
                            
                            {/* Gradient Input */}
                            <div className="relative h-2 w-full rounded-full overflow-hidden">
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="10" 
                                    value={item.selectedSpiceLevel || item.spiceLevel}
                                    onChange={(e) => handleSpiceChange(item.id, parseInt(e.target.value))}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-red-900 w-full h-full"></div>
                                {/* Thumb Indicator simulation */}
                                <div 
                                    className="absolute top-0 h-full w-2 bg-white border border-gray-300 shadow-sm pointer-events-none transition-all duration-75"
                                    style={{ left: `calc(${((item.selectedSpiceLevel || item.spiceLevel) - 1) * 11.11}% - 4px)` }}
                                ></div>
                            </div>

                            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium">
                                <span>Mild</span>
                                <span>Medium</span>
                                <span>Fire</span>
                            </div>
                        </div>

                        {/* Extra Toppings */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase block mb-2">Extras</label>
                            <div className="flex flex-wrap gap-2">
                                {TOPPINGS.map((top) => {
                                    const isSelected = item.selectedToppings?.includes(top.id);
                                    return (
                                        <button
                                            key={top.id}
                                            onClick={() => toggleTopping(item.id, top.id, item.selectedToppings || [])}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-2
                                                ${isSelected 
                                                    ? 'bg-saffron-50 dark:bg-saffron-900/40 border-saffron-500 text-saffron-700 dark:text-saffron-300' 
                                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300'}
                                            `}
                                        >
                                            {top.name} <span className="opacity-60">+₹{top.price}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                   </div>
                </div>
              ))}
            </div>

            {/* Walk & Earn Suggestion */}
            <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${walkPickup ? 'bg-green-50 dark:bg-green-900/30 border-green-500 ring-1 ring-green-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300'}`} onClick={() => setWalkPickup(!walkPickup)}>
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2.5 rounded-full text-green-600 dark:text-green-400">
                        <Footprints className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Walk & Earn Pickup</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Store is just 0.8km away.</p>
                    </div>
                    <div className="text-right">
                         <span className="block font-bold text-green-600 dark:text-green-400 text-sm">+25 Pts</span>
                         <span className="text-[10px] text-gray-400 line-through">₹40 Fee</span>
                    </div>
                </div>
            </div>

            {/* Instructions & Cutlery */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
                 <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                        <ChefHat className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Cooking Instructions
                    </label>
                    <textarea 
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Less oil, extra raita..." 
                        className="input-premium"
                        rows={2}
                    />
                 </div>
                 <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <Utensils className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Add Cutlery</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Help us reduce waste</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={cutlery} onChange={(e) => setCutlery(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                 </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-sm space-y-3 pb-6">
               <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Bill Details</h3>
               <div className="flex justify-between text-gray-600 dark:text-gray-300">
                 <span>Item Total</span>
                 <span>₹{subtotal}</span>
               </div>
               <div className="flex justify-between text-gray-600 dark:text-gray-300">
                 <span>Delivery Fee</span>
                 {deliveryFee === 0 ? <span className="text-green-500 font-bold">FREE</span> : <span>₹{deliveryFee}</span>}
               </div>
               <div className="flex justify-between text-gray-600 dark:text-gray-300">
                 <span>GST & Restaurant Charges</span>
                 <span>₹{gst}</span>
               </div>
               <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>
               <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                 <span>To Pay</span>
                 <span>₹{total}</span>
               </div>
            </div>
            
            <div className="h-4"></div>
          </>
        )}
      </div>

      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex gap-4">
                <button 
                    onClick={onBack}
                    className="flex-1 py-4 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Add More
                </button>
                <button 
                    onClick={onPlaceOrder}
                    className="flex-[2] bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-4 rounded-xl font-bold shadow-xl shadow-gray-900/20 flex justify-between px-6 active:scale-95 transition-all items-center hover:bg-black dark:hover:bg-gray-200"
                >
                    <div className="text-left">
                        <p className="text-xs text-gray-400 dark:text-gray-600 font-normal uppercase tracking-wider">Total</p>
                        <p className="text-lg leading-none">₹{total}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        Checkout <ArrowRight className="w-5 h-5" />
                    </div>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

const CookingPotEmpty = () => (
    <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
        <path d="M4 8v-1a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v1" />
        <path d="M12 5v-3" />
        <path d="M8 5v-2" />
        <path d="M16 5v-2" />
    </svg>
);
