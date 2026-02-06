
import React, { useState } from 'react';
import { Restaurant, Biryani, Dish, RestaurantDetails } from '../types';
import { RESTAURANT_DETAILS, MASTER_RECIPE_LIBRARY } from '../constants';
import { ArrowLeft, Star, Clock, MapPin, Search, Plus, Minus, Flame, X, CheckCircle2, ShoppingBag, Share2, Info, ChevronRight, MessageSquare, Utensils, Tag, ChefHat, FileText, Heart, Download, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { CinematicIntro } from './CinematicIntro';
import { SmartImage } from './SmartImage';

interface Props {
  restaurant: Restaurant;
  onBack: () => void;
  onAddToCart: (item: Biryani) => void;
  onShowToast?: (msg: string) => void;
}

const DEFAULT_STORY = "[Restaurant Name] began as a family kitchen where time and charcoal defined flavor. Every batch is slow-cooked over coal, layered with caramelized onions, ghee and hand-ground spices — a recipe passed through generations. We cook like family: with patience, heat, and a promise that each serving carries the scent of home.";

export const RestaurantDetail: React.FC<Props> = ({ restaurant, onBack, onAddToCart, onShowToast }) => {
  const fullDetails: RestaurantDetails = RESTAURANT_DETAILS[restaurant.id] || { ...restaurant, menu: [], reviews: [], story: '', activeOffers: [] };
  const [showIntro, setShowIntro] = useState(true);
  
  // State for the expanded Radio-Card menu item
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null);
  
  // State for adding to cart
  const [orderState, setOrderState] = useState<{ [key: string]: { qty: number, addons: string[], spice: number } }>({});

  const storyText = fullDetails.story && fullDetails.story.length > 50 ? fullDetails.story : DEFAULT_STORY.replace('[Restaurant Name]', fullDetails.name);

  // Helper to init order state when expanding a card
  const handleExpandDish = (dish: Dish) => {
      if (expandedDishId === dish.id) {
          setExpandedDishId(null);
      } else {
          setExpandedDishId(dish.id);
          if (!orderState[dish.id]) {
              setOrderState(prev => ({
                  ...prev,
                  [dish.id]: { qty: 1, addons: [], spice: dish.spiceLevel }
              }));
          }
      }
  };

  const updateOrder = (dishId: string, updates: Partial<{ qty: number, addons: string[], spice: number }>) => {
      setOrderState(prev => ({
          ...prev,
          [dishId]: { ...prev[dishId], ...updates }
      }));
  };

  const handleFinalAdd = (dish: Dish) => {
      const state = orderState[dish.id];
      if (!state) return;

      const cartItem: any = {
          ...dish,
          style: 'Hyderabadi', 
          hoverImageUrl: dish.imageUrl,
          quantity: state.qty,
          selectedSpiceLevel: state.spice,
          selectedToppings: state.addons
      };

      for(let i=0; i<state.qty; i++) {
          onAddToCart(cartItem);
      }
      
      setExpandedDishId(null);
      if (onShowToast) onShowToast(`Added ${state.qty} x ${dish.name} to Handi`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 flex flex-col relative font-sans text-gray-900 dark:text-cream-50 transition-colors">
      
      {showIntro && (
        <CinematicIntro 
            lines={['seal the lid', 'let the dum speak']} 
            onComplete={() => setShowIntro(false)} 
        />
      )}

      {/* --- FLOATING NAV --- */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <span className="font-serif font-bold text-lg">{fullDetails.name}</span>
          <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5" />
              </button>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full">
          
          {/* --- LEFT COLUMN: THE STORY (Scrollable) --- */}
          <div className="w-full lg:w-[45%] lg:h-[calc(100vh-64px)] lg:sticky lg:top-[64px] lg:overflow-y-auto custom-scrollbar p-6 space-y-10 border-r border-gray-200 dark:border-white/5 bg-white dark:bg-charcoal-950">
              
              {/* Hero Image */}
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl group">
                  <SmartImage src={fullDetails.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hero" query={fullDetails.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="bg-saffron-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Est. 1985</span>
                          <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold border border-white/20">
                              <Star className="w-3 h-3 text-gold-500 fill-gold-500" /> {fullDetails.rating}
                          </span>
                      </div>
                      <h1 className="text-3xl font-serif font-bold leading-tight">{fullDetails.name}</h1>
                  </div>
              </div>

              {/* Origin Story */}
              <div>
                  <h3 className="text-xl font-bold font-serif mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <BookOpen className="w-5 h-5 text-saffron-500" /> The Origin Story
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-saffron-500 pl-4 italic">
                      "{storyText}"
                  </p>
              </div>

              {/* The Process (Craft) */}
              <div>
                  <h3 className="text-xl font-bold font-serif mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Flame className="w-5 h-5 text-red-500" /> The Craft
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-charcoal-900 p-4 rounded-2xl border border-gray-200 dark:border-white/5">
                          <h4 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">Dum Pukht</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Slow cooked in sealed clay pots to trap aroma.</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-charcoal-900 p-4 rounded-2xl border border-gray-200 dark:border-white/5">
                          <h4 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">Secret Spice</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Hand-ground masala blend aged for 2 weeks.</p>
                      </div>
                  </div>
                  <div className="mt-4 h-32 rounded-2xl overflow-hidden relative">
                      <SmartImage src="https://images.unsplash.com/photo-1626777553634-5d9c79245237?q=80&w=800" className="w-full h-full object-cover" alt="Spices" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="text-white font-bold tracking-widest uppercase text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">Kitchen Tour</span>
                      </div>
                  </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 dark:bg-charcoal-900 p-4 rounded-2xl flex items-start gap-3 border border-gray-200 dark:border-white/5">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Visit Us</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{fullDetails.address}</p>
                      <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {fullDetails.time} from your location
                      </p>
                  </div>
              </div>
          </div>

          {/* --- RIGHT COLUMN: THE MENU (Radio Card Style) --- */}
          <div className="w-full lg:w-[55%] bg-gray-50 dark:bg-black/20 p-4 lg:p-8 min-h-screen">
              <div className="max-w-2xl mx-auto space-y-6">
                  <div className="flex justify-between items-end mb-2">
                      <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Menu</h2>
                      <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">{fullDetails.menu.length} Items</span>
                  </div>

                  {fullDetails.menu.map((dish) => {
                      const isExpanded = expandedDishId === dish.id;
                      const state = orderState[dish.id] || { qty: 1, addons: [], spice: dish.spiceLevel };

                      return (
                          <div 
                            key={dish.id}
                            onClick={() => !isExpanded && handleExpandDish(dish)}
                            className={`group rounded-2xl transition-all duration-300 border overflow-hidden cursor-pointer
                                ${isExpanded 
                                    ? 'bg-white dark:bg-charcoal-900 border-saffron-500 ring-1 ring-saffron-500 shadow-xl scale-[1.01]' 
                                    : 'bg-white dark:bg-charcoal-900 border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:shadow-lg'}
                            `}
                          >
                              {/* Card Header (Always Visible) */}
                              <div className="flex p-4 gap-4">
                                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-charcoal-800">
                                      <SmartImage src={dish.imageUrl} className="w-full h-full object-cover" alt={dish.name} query={dish.name} />
                                      <div className={`absolute top-1 left-1 w-3 h-3 border ${dish.isVeg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'} flex items-center justify-center p-0.5 rounded-sm`}>
                                          <div className={`w-full h-full rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                      </div>
                                  </div>
                                  <div className="flex-1 flex flex-col justify-center">
                                      <div className="flex justify-between items-start">
                                          <h3 className={`font-bold text-lg lg:text-xl transition-colors ${isExpanded ? 'text-saffron-600' : 'text-gray-900 dark:text-white'}`}>{dish.name}</h3>
                                          <span className="font-bold text-gray-900 dark:text-white">₹{dish.price}</span>
                                      </div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{dish.description}</p>
                                      
                                      {!isExpanded && (
                                          <div className="mt-2 flex items-center gap-3">
                                              <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded flex items-center gap-1">
                                                  <Flame className="w-3 h-3" /> {dish.spiceLevel}
                                              </span>
                                              <span className="text-[10px] font-bold text-gray-400">Click to customize</span>
                                          </div>
                                      )}
                                  </div>
                              </div>

                              {/* Expanded Details (Radio Content) */}
                              <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 dark:bg-black/20 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="p-4 pt-0 space-y-4">
                                      <div className="h-[1px] bg-gray-200 dark:bg-white/5 w-full mb-4"></div>
                                      
                                      <p className="text-saffron-700 dark:text-saffron-400 italic text-sm font-serif">"{dish.sensoryDescription}"</p>

                                      {/* Controls */}
                                      <div className="space-y-3">
                                          <div className="flex items-center justify-between">
                                              <span className="text-xs font-bold text-gray-500 uppercase">Spice Level</span>
                                              <span className="text-xs font-bold text-saffron-600">{state.spice}/10</span>
                                          </div>
                                          <input 
                                              type="range" 
                                              min="1" 
                                              max="10" 
                                              value={state.spice}
                                              onChange={(e) => updateOrder(dish.id, { spice: parseInt(e.target.value) })}
                                              className="rice-slider"
                                          />
                                          
                                          <div className="flex gap-2 flex-wrap">
                                              {['Extra Raita', 'Fried Onions', 'Egg'].map(addon => (
                                                  <button
                                                      key={addon}
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          const newAddons = state.addons.includes(addon) 
                                                              ? state.addons.filter(a => a !== addon) 
                                                              : [...state.addons, addon];
                                                          updateOrder(dish.id, { addons: newAddons });
                                                      }}
                                                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                                                          state.addons.includes(addon)
                                                              ? 'bg-saffron-600 border-saffron-600 text-white'
                                                              : 'bg-white dark:bg-charcoal-800 border-gray-200 dark:border-white/10 text-gray-500 hover:border-gray-400'
                                                      }`}
                                                  >
                                                      {addon}
                                                  </button>
                                              ))}
                                          </div>
                                      </div>

                                      {/* Action Bar */}
                                      <div className="flex gap-3 pt-2">
                                          <div className="flex items-center bg-white dark:bg-charcoal-800 rounded-xl px-2 border border-gray-200 dark:border-white/10">
                                              <button 
                                                onClick={(e) => { e.stopPropagation(); updateOrder(dish.id, { qty: Math.max(1, state.qty - 1) }); }}
                                                className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                              >
                                                  <Minus className="w-4 h-4" />
                                              </button>
                                              <span className="w-6 text-center font-bold text-gray-900 dark:text-white">{state.qty}</span>
                                              <button 
                                                onClick={(e) => { e.stopPropagation(); updateOrder(dish.id, { qty: state.qty + 1 }); }}
                                                className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                              >
                                                  <Plus className="w-4 h-4" />
                                              </button>
                                          </div>
                                          <button 
                                              onClick={(e) => { e.stopPropagation(); handleFinalAdd(dish); }}
                                              className="flex-1 bg-saffron-600 text-white font-bold rounded-xl shadow-lg shadow-saffron-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 btn-gold"
                                          >
                                              Add to Cart <span className="bg-black/20 px-2 py-0.5 rounded text-xs">₹{dish.price * state.qty}</span>
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      </div>
    </div>
  );
};
