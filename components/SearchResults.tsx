import React, { useState } from 'react';
import { NEARBY_RESTAURANTS } from '../constants';
import { Restaurant } from '../types';
import { Search, Star, Leaf, Navigation, ArrowLeft, Filter, Tag, Clock, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onBack: () => void;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export const SearchResults: React.FC<Props> = ({ onBack, onRestaurantSelect }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
      veg: false,
      walkable: false,
      rating: false,
      offers: false
  });

  const filteredRestaurants = NEARBY_RESTAURANTS.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(query.toLowerCase()) || 
                            r.desc.toLowerCase().includes(query.toLowerCase()) ||
                            r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      
      if (!matchesSearch) return false;
      if (filters.veg && !r.tags.includes('Veg Friendly')) return false; // Mock tag logic
      if (filters.walkable && !r.walkable) return false;
      if (filters.rating && r.rating < 4.5) return false;
      if (filters.offers && !r.offers) return false;

      return true;
  });

  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-50 font-sans">
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-40 bg-charcoal-950/90 backdrop-blur-md border-b border-white/5 p-4 md:p-6">
        <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 relative group">
                <Search className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-white transition-colors pointer-events-none" />
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search restaurants, dishes, or areas..."
                    className="input-premium pl-12 rounded-full"
                    autoFocus
                />
            </div>
        </div>

        {/* Filters Row */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            <button className="flex items-center gap-2 px-4 py-2 bg-charcoal-800 rounded-lg border border-white/10 text-sm font-bold hover:bg-charcoal-700 transition-colors">
                <Filter className="w-4 h-4" /> Filter
            </button>
            <FilterChip label="4.5+" icon={<Star className="w-3 h-3" />} active={filters.rating} onClick={() => setFilters(f => ({...f, rating: !f.rating}))} />
            <FilterChip label="Walkable" icon={<Leaf className="w-3 h-3" />} active={filters.walkable} onClick={() => setFilters(f => ({...f, walkable: !f.walkable}))} />
            <FilterChip label="Offers" icon={<Tag className="w-3 h-3" />} active={filters.offers} onClick={() => setFilters(f => ({...f, offers: !f.offers}))} />
            <FilterChip label="Veg Only" active={filters.veg} onClick={() => setFilters(f => ({...f, veg: !f.veg}))} />
        </div>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {query ? `Results for "${query}"` : 'Recommended for You'}
            <span className="text-sm font-normal text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">{filteredRestaurants.length}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(r => (
                  // Using an anchor tag with URL simulation for "Open in new tab" capability
                  <a 
                    key={r.id} 
                    href={`/?screen=RESTAURANT_DETAIL&id=${r.id}`}
                    onClick={(e) => {
                        // If standard click, use SPA navigation
                        if (!e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            onRestaurantSelect(r);
                        }
                    }}
                    className="block group bg-charcoal-900 rounded-2xl overflow-hidden border border-white/5 hover:border-saffron-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                      <div className="relative h-48 overflow-hidden">
                          <img src={r.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={r.name} />
                          <div className="absolute top-2 right-2 bg-charcoal-950/80 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                                {r.rating} <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                          </div>
                          {r.offers && (
                              <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">
                                  50% OFF
                              </div>
                          )}
                      </div>
                      <div className="p-5">
                          <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold text-xl text-cream-50 group-hover:text-saffron-500 transition-colors">{r.name}</h3>
                              <span className="text-xs text-gray-400">{r.distance}</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-4 line-clamp-1">{r.desc}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                              {r.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-[10px] font-bold bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">
                                      {tag}
                                  </span>
                              ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <span className="flex items-center gap-1.5 text-xs text-green-400 font-bold">
                                  <Clock className="w-3.5 h-3.5" /> {r.time}
                              </span>
                              <span className="text-xs font-bold text-saffron-500 group-hover:underline">
                                  View Menu
                              </span>
                          </div>
                      </div>
                  </a>
              ))}
          </div>

          {filteredRestaurants.length === 0 && (
              <div className="text-center py-20">
                  <div className="w-20 h-20 bg-charcoal-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-300">No biryani found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search for 'Hyderabadi'</p>
              </div>
          )}
      </div>
    </div>
  );
};

const FilterChip: React.FC<{ label: string; icon?: React.ReactNode; active?: boolean; onClick: () => void }> = ({ label, icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold whitespace-nowrap transition-all
            ${active 
                ? 'bg-saffron-600 border-saffron-600 text-white shadow-lg shadow-saffron-500/20' 
                : 'bg-charcoal-800 border-white/10 text-gray-400 hover:bg-charcoal-700 hover:text-white'}
        `}
    >
        {icon} {label}
    </button>
);