
import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, User, ShoppingBag, Heart, Leaf, Star, MapPin, Clock, Flame, Tag, Search, Bell, Wallet, ChevronRight, Navigation, Crown } from 'lucide-react';
import { MENU_ITEMS, HOME_CAROUSEL_IMAGES, NEARBY_RESTAURANTS } from '../constants';
import { Logo } from './Logo';
import { CinematicIntro } from './CinematicIntro';
import * as L from 'leaflet';

interface Props {
  onComplete: () => void;
  onGoToMap: () => void;
  onGoToRecipes: () => void;
  onSearch: () => void;
  onOpenProfile?: () => void;
  onError?: (msg: string) => void;
}

// Helper for scroll animations
const useOnScreen = (options: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setVisible(true);
      }, options);

      if (ref.current) observer.observe(ref.current);
      return () => {
          if (ref.current) observer.unobserve(ref.current);
      }
  }, [ref, options]);

  return [ref, visible] as const;
};

export const Landing: React.FC<Props> = ({ onComplete, onGoToMap, onGoToRecipes, onSearch, onOpenProfile, onError }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [mapContainerRef, mapVisible] = useOnScreen({ threshold: 0.1 });
  
  // Check session storage to only show intro once per session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    if (!hasVisited) {
      setShowIntro(true);
    }
  }, []);

  // Carousel Logic
  useEffect(() => {
    if (showIntro) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_CAROUSEL_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showIntro]);

  // Mini Map Init
  useEffect(() => {
      if (mapVisible && mapRef.current && !mapInstance.current) {
          try {
              const map = L.map(mapRef.current, {
                  zoomControl: false,
                  attributionControl: false,
                  dragging: false,
                  scrollWheelZoom: false,
                  doubleClickZoom: false
              }).setView([17.3850, 78.4867], 13);

              L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                  maxZoom: 19
              }).addTo(map);

              // Add a few pins
              const locations = [
                  [17.3850, 78.4867], [17.3950, 78.4967], [17.3750, 78.4767]
              ];
              
              const pinIcon = L.divIcon({
                  className: 'custom-pin',
                  html: `<div style="background-color:#ea580c;width:8px;height:8px;border-radius:50%;box-shadow:0 0 10px #ea580c;"></div>`,
                  iconSize: [8, 8]
              });

              locations.forEach((loc: any) => {
                  L.marker(loc, { icon: pinIcon }).addTo(map);
              });

              mapInstance.current = map;
          } catch(e) {
              console.error("Mini map init failed", e);
          }
      }
  }, [mapVisible]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasVisitedHome', 'true');
  };

  const handleProfileClick = (e: React.MouseEvent | React.TouchEvent) => {
    try {
        e.preventDefault();
        e.stopPropagation();
        if (onOpenProfile) {
            onOpenProfile();
        } else {
            throw new Error("Navigation handler missing for Profile Menu");
        }
    } catch (err) {
        console.error("Menu Open Error:", err);
        if (onError) onError("Unable to open menu. Try refreshing — we’re on it.");
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-body transition-colors duration-1000 ${showIntro ? 'bg-charcoal-950' : 'bg-lux-gradient'}`}>
      
      {/* ----------------- INTRO OVERLAY ----------------- */}
      {showIntro && (
        <CinematicIntro 
          lines={['hungry?', 'there’s a biryani calling you…', 'within 1 km']} 
          onComplete={handleIntroComplete} 
        />
      )}

      {/* ----------------- DASHBOARD CONTENT ----------------- */}
      {!showIntro && (
        <div className="animate-fade-in">
           {/* --- HEADER --- */}
           <header className="fixed top-0 inset-x-0 z-50 bg-charcoal-950/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between shadow-premium">
               <div className="flex items-center gap-6 flex-1">
                   <Logo size="sm" variant="light" />
                   {/* Desktop Search */}
                   <div onClick={onSearch} className="hidden md:flex flex-1 max-w-md relative group">
                        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-white transition-colors pointer-events-none" />
                        <input 
                            type="text" 
                            readOnly 
                            placeholder="Search biryani..." 
                            className="input-premium pl-10 cursor-pointer text-sm"
                        />
                   </div>
               </div>
               
               <div className="flex items-center gap-4 md:gap-6">
                   <button onClick={onSearch} className="md:hidden p-2 text-gray-400 hover:text-white">
                        <Search className="w-5 h-5" />
                   </button>
                   <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                       <Bell className="w-5 h-5" />
                       <span className="absolute top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></span>
                   </button>
                   <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-red-700 px-4 py-2 rounded-full text-xs font-bold text-white hover:brightness-110 transition-all shadow-glow">
                       <Wallet className="w-3 h-3" /> 185 Pts
                   </button>
                   
                   {/* Avatar Button */}
                   <button 
                       onClick={handleProfileClick}
                       className="w-10 h-10 md:w-11 md:h-11 bg-charcoal-800 rounded-full overflow-hidden border border-white/10 relative group focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-offset-2 focus:ring-offset-charcoal-950 transition-all"
                       aria-label="Open profile menu"
                   >
                       <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 ring-2 ring-gold-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </button>
               </div>
           </header>

           <div className="pt-28 pb-24 max-w-[1400px] mx-auto px-4 md:px-8 space-y-20">
               
               {/* --- HERO SECTION (SPLIT) --- */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[550px]">
                   {/* Left: Carousel */}
                   <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group bg-charcoal-900 shadow-premium border border-white/5">
                        {HOME_CAROUSEL_IMAGES.slice(0,3).map((img, idx) => (
                            <div 
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img src={img} alt="Hero" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4000ms]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent"></div>
                            </div>
                        ))}
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
                            <span className="bg-saffron-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-lg">Featured</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-cream-50 mb-4 leading-tight reveal-text">
                                The Lost Recipes of <br /><span className="text-gold-400 italic">Nizam's Kitchen</span>
                            </h2>
                            <p className="text-gray-300 max-w-lg mb-8 text-lg font-light leading-relaxed">
                                Rediscover the slow-cooked art of Dum Pukht with our curated selection of heritage kitchens.
                            </p>
                            <button onClick={onComplete} className="bg-cream-50 text-charcoal-950 px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-glow active:scale-95 btn-gold">
                                Explore Collection <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                   </div>

                   {/* Right: Map & Filters Widget */}
                   <div className="flex flex-col gap-8">
                        {/* Map Preview */}
                        <div ref={mapContainerRef} className="flex-1 bg-charcoal-900 rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-saffron-500/30 transition-colors card-vip min-h-[250px]" onClick={onGoToMap}>
                            {/* Static Map Fallback */}
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/San_Francisco_Map_Lighter_Grayscale.jpg')] bg-cover opacity-20 mix-blend-luminosity"></div>
                            
                            {/* Live Leaflet Map */}
                            <div ref={mapRef} className="absolute inset-0 z-0 opacity-60 mix-blend-screen" />

                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal-950 z-10 pointer-events-none"></div>
                            
                            <div className="absolute top-4 right-4 bg-charcoal-950/80 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-cream-50 flex items-center gap-2 border border-white/10 shadow-lg z-20">
                                <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse"></span> Near You
                            </div>

                            <div className="absolute bottom-8 left-8 z-20">
                                <h3 className="text-2xl font-bold text-cream-50 mb-2">Live Map</h3>
                                <p className="text-gray-400 text-sm mb-4 font-light">12 Kitchens cooking now</p>
                                <div className="flex -space-x-3">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-charcoal-900 bg-charcoal-700"></div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-charcoal-900 bg-saffron-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">+9</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Filter */}
                        <div className="bg-charcoal-900 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors card-vip">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-cream-50 text-lg">Quick Hunt</h3>
                                <div onClick={onSearch} className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors"><Search className="w-5 h-5 text-gray-500" /></div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {['Hyderabadi', 'Kolkata', 'Lucknowi', 'Ambur'].map(tag => (
                                    <span key={tag} onClick={onSearch} className="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 rounded-xl text-sm font-medium text-gray-300 border border-white/5 cursor-pointer transition-all hover:text-saffron-400 hover:border-saffron-500/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                   </div>
               </div>

               {/* ... (Rest of sections remain the same) ... */}
               {/* --- SECTION: TRENDING --- */}
               <CinematicSection title="Trending Biryanis" subtitle="Top pots in your neighbourhood" onAction={onComplete}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MENU_ITEMS.slice(0, 4).map((item) => (
                            <BiryaniCard key={item.id} item={item} />
                        ))}
                    </div>
               </CinematicSection>

               {/* --- SECTION: NEW PLACES --- */}
               <CinematicSection title="New Hot Places" subtitle="Fresh handi — calling within 1 km" onAction={onGoToMap}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {NEARBY_RESTAURANTS.slice(0,2).map((rest) => (
                            <div key={rest.id} className="bg-charcoal-900 rounded-2xl p-5 flex gap-5 border border-white/5 group transition-all cursor-pointer hover:bg-charcoal-800 card-vip">
                                <div className="w-32 h-32 rounded-xl overflow-hidden relative shadow-lg">
                                    <img src={rest.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={rest.name} />
                                    {rest.isNew && <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md">NEW</span>}
                                </div>
                                <div className="flex-1 py-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-xl text-cream-50 mb-1 group-hover:text-saffron-400 transition-colors">{rest.name}</h3>
                                        <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{rest.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                        <span className="flex items-center gap-1 text-gray-300"><Star className="w-3 h-3 text-gold-500" /> {rest.rating}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {rest.time}</span>
                                        <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {rest.distance}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
               </CinematicSection>

                {/* --- SECTION: OFFERS --- */}
               <CinematicSection title="Weekend Feasts" subtitle="Festival specials & group offers" onAction={onComplete}>
                    <div className="bg-gradient-to-r from-red-700 to-saffron-900 rounded-3xl p-10 relative overflow-hidden border border-white/10 shadow-premium group card-vip">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 opacity-20 blur-[100px] rounded-full pointer-events-none group-hover:opacity-30 transition-opacity"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <span className="bg-gold-500 text-charcoal-950 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow">Limited Time</span>
                                <h3 className="text-4xl font-serif font-bold text-cream-50 mb-2 reveal-text">The Royal Family Pack</h3>
                                <p className="text-saffron-100 max-w-lg text-lg">Get 1kg Hyderabadi Dum + 2 Starters + 4 Drinks at flat 40% OFF. Perfect for weekend gatherings.</p>
                            </div>
                            <button className="bg-cream-50 text-red-800 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 btn-gold">
                                <Tag className="w-4 h-4" /> Claim Offer
                            </button>
                        </div>
                    </div>
               </CinematicSection>

           </div>
        </div>
      )}
    </div>
  );
};

const CinematicSection: React.FC<{ title: string; subtitle: string; children: React.ReactNode; onAction?: () => void }> = ({ title, subtitle, children, onAction }) => {
    const [ref, visible] = useOnScreen({ threshold: 0.1 });
    
    return (
        <section ref={ref} className="space-y-8">
             <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                 <div className={`transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                     <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream-50 mb-2">{title}</h2>
                     <p className="text-saffron-500 font-medium text-lg flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-saffron-500/50"></span> {subtitle}
                     </p>
                 </div>
                 <button onClick={onAction} className="text-gray-400 hover:text-white text-sm font-bold flex items-center gap-1 transition-colors group btn-gold px-4 py-2 rounded-full">
                     View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
             </div>
             <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                 {children}
             </div>
        </section>
    );
};

const BiryaniCard: React.FC<{ item: any }> = ({ item }) => {
    return (
        <div className="group relative bg-charcoal-900 rounded-2xl overflow-hidden border border-white/5 card-vip cursor-pointer">
            {/* VIP Tag (Mock logic: IDs 1 & 3) */}
            {(item.id === '1' || item.id === '3') && (
                <div className="absolute top-0 left-4 z-20">
                     <div className="bg-gold-500 text-charcoal-950 text-[10px] font-bold px-2 py-3 rounded-b-lg shadow-lg flex flex-col items-center gap-1">
                        <Crown className="w-3 h-3" />
                        <span>VIP</span>
                     </div>
                </div>
            )}

            <div className="aspect-[4/3] overflow-hidden relative">
                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-charcoal-950/0 transition-colors"></div>
                
                {/* Steam Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
                    <div className="w-16 h-16 bg-white blur-2xl rounded-full animate-steam absolute bottom-0 left-1/2"></div>
                </div>

                <div className="absolute top-2 right-2 bg-charcoal-950/60 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-1 shadow-lg">
                    {item.rating} <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-cream-50 line-clamp-1 group-hover:text-saffron-500 transition-colors">{item.name}</h3>
                    <div className={`w-3 h-3 border ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center p-0.5 mt-1.5`}>
                        <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                </div>
                <p className="text-gray-400 text-xs mb-5 line-clamp-2 min-h-[2.5em] leading-relaxed">{item.sensoryDescription}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-cream-50 font-bold text-lg">₹{item.price}</span>
                    <button className="text-xs font-bold px-4 py-2 rounded-lg btn-gold">
                        View Menu
                    </button>
                </div>
            </div>
        </div>
    );
};