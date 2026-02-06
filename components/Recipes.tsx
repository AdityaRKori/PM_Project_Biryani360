
import React, { useState, useMemo } from 'react';
import { RECIPES_DATA, CHEF_TIPS } from '../constants';
import { RecipeDetail } from '../types';
import { ArrowLeft, Clock, Flame, ChefHat, X, ChevronRight, Utensils, Search, SlidersHorizontal, CheckSquare, Square, Info, ShoppingBag, FileText, Download, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { CinematicIntro } from './CinematicIntro';
import { SmartImage } from './SmartImage';

interface Props {
  onBack: () => void;
}

const REGIONS = ['All', 'Hyderabad', 'Lucknow', 'Kolkata', 'Kerala', 'Tamil Nadu', 'International'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

export const Recipes: React.FC<Props> = ({ onBack }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  
  // Filters
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterType, setFilterType] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Compare
  const [compareList, setCompareList] = useState<RecipeDetail[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const isNonVeg = (ingredients: { item: string; qty: string }[]) => {
      const meatKeywords = ['Mutton', 'Chicken', 'Fish', 'Egg', 'Eggs', 'Beef', 'Lamb', 'Prawns'];
      return ingredients.some(ing => meatKeywords.some(keyword => ing.item.includes(keyword)));
  };

  // Advanced Filtering
  const filteredRecipes = useMemo(() => {
      return RECIPES_DATA.filter(r => {
          // Region Filter
          if (filterRegion !== 'All' && !r.origin.includes(filterRegion)) return false;
          
          // Difficulty Filter
          if (filterDifficulty !== 'All' && r.difficulty !== filterDifficulty) return false;

          // Type Filter
          const nonVeg = isNonVeg(r.ingredients);
          if (filterType === 'VEG' && nonVeg) return false;
          if (filterType === 'NON_VEG' && !nonVeg) return false;

          // Search Filter (Matches Title, Ingredients, Steps)
          if (searchQuery) {
              const q = searchQuery.toLowerCase();
              const inName = r.name.toLowerCase().includes(q);
              const inIng = r.ingredients.some(i => i.item.toLowerCase().includes(q));
              const inSteps = r.steps.some(s => s.desc.toLowerCase().includes(q));
              if (!inName && !inIng && !inSteps) return false;
          }

          return true;
      });
  }, [filterRegion, filterType, filterDifficulty, searchQuery]);

  const toggleCompare = (recipe: RecipeDetail, e: React.MouseEvent) => {
      e.stopPropagation();
      if (compareList.find(r => r.id === recipe.id)) {
          setCompareList(prev => prev.filter(r => r.id !== recipe.id));
      } else {
          if (compareList.length < 3) {
              setCompareList(prev => [...prev, recipe]);
          }
      }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-50 flex flex-col relative overflow-hidden font-sans">
      
      {showIntro && (
        <CinematicIntro 
            lines={['unlock the vault', 'generations of spice', 'master the art']} 
            onComplete={() => setShowIntro(false)} 
        />
      )}

      {/* --- HEADER --- */}
      <div className="sticky top-0 z-30 bg-charcoal-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-saffron-500" />
                </button>
                <div>
                    <Logo size="sm" variant="light" />
                    <p className="text-xs text-saffron-400 font-medium uppercase tracking-wider mt-0.5">Global Index</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-lg border transition-colors ${showFilters ? 'bg-saffron-600 border-saffron-600 text-white' : 'border-white/10 hover:bg-white/10'}`}
                >
                    <SlidersHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 group">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-white transition-colors pointer-events-none" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recipes, ingredients, techniques..."
                    className="input-premium pl-10 text-sm"
                />
            </div>
            
            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {['ALL', 'VEG', 'NON_VEG'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilterType(f as any)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border whitespace-nowrap transition-colors
                            ${filterType === f 
                                ? 'bg-saffron-600 border-saffron-600 text-white' 
                                : 'border-white/10 text-gray-400 hover:border-gray-500'
                            }
                        `}
                    >
                        {f === 'ALL' ? 'All Types' : f === 'VEG' ? 'Veg Only' : 'Non-Veg'}
                    </button>
                ))}
            </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 animate-slide-up">
                <select 
                    value={filterRegion} 
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="bg-charcoal-900 border border-white/10 rounded-lg p-2 text-sm text-gray-300 outline-none"
                >
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <select 
                    value={filterDifficulty} 
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="bg-charcoal-900 border border-white/10 rounded-lg p-2 text-sm text-gray-300 outline-none"
                >
                    {DIFFICULTIES.map(d => <option key={d} value={d}>{d} Level</option>)}
                </select>
            </div>
        )}
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
            {filteredRecipes.map((recipe) => (
                <div 
                    key={recipe.id}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border border-white/5 bg-charcoal-900 hover:border-saffron-500/50 hover:shadow-2xl hover:shadow-saffron-900/20 hover:-translate-y-1
                        ${activeId === recipe.id ? 'ring-2 ring-saffron-500' : ''}
                    `}
                    onMouseEnter={() => setActiveId(recipe.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onClick={() => setSelectedRecipe(recipe)}
                >
                    {/* Image */}
                    <div className="h-48 overflow-hidden relative bg-charcoal-800">
                        <SmartImage 
                           src={recipe.imageUrl} 
                           alt={recipe.name} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           query={recipe.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80"></div>
                        
                        {/* Compare Checkbox */}
                        <div 
                            onClick={(e) => toggleCompare(recipe, e)}
                            className="absolute top-2 right-2 p-2 rounded-lg backdrop-blur-md transition-colors z-20 group/chk"
                        >
                            {compareList.find(r => r.id === recipe.id) ? (
                                <CheckSquare className="w-5 h-5 text-saffron-500 fill-saffron-500/20" />
                            ) : (
                                <Square className="w-5 h-5 text-white/50 group-hover/chk:text-white" />
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <div className="mb-2 flex justify-between items-center">
                             <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{recipe.origin}</span>
                             <div className={`w-3 h-3 border ${!isNonVeg(recipe.ingredients) ? 'border-green-500' : 'border-red-500'} flex items-center justify-center p-0.5`}>
                                 <div className={`w-full h-full rounded-full ${!isNonVeg(recipe.ingredients) ? 'bg-green-500' : 'bg-red-500'}`}></div>
                             </div>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-saffron-400 transition-colors">
                            <HighlightText text={recipe.name} highlight={searchQuery} />
                        </h3>
                        
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.cookTime}</span>
                            <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-red-500" /> {recipe.spiceLevel}/10</span>
                            <span className="flex items-center gap-1"><ChefHat className="w-3 h-3" /> {recipe.difficulty}</span>
                        </div>

                        {/* Hover Overlay for Ingredients Match */}
                        {searchQuery && (
                            <div className="text-xs text-gray-500 line-clamp-2">
                                Matches: <span className="text-saffron-300 italic">
                                    {recipe.ingredients.filter(i => i.item.toLowerCase().includes(searchQuery.toLowerCase())).map(i => i.item).join(', ')}
                                    {recipe.steps.some(s => s.desc.toLowerCase().includes(searchQuery.toLowerCase())) ? ' (Steps)' : ''}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        {filteredRecipes.length === 0 && (
            <div className="text-center py-20 text-gray-600">
                No recipes found matching your criteria.
            </div>
        )}
      </div>

      {/* --- COMPARE BAR --- */}
      {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-charcoal-800 border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-slide-up w-auto max-w-[90vw]">
              <div className="flex -space-x-3">
                  {compareList.map((r) => (
                      <div key={r.id} className="w-10 h-10 rounded-full border-2 border-charcoal-800 overflow-hidden relative bg-charcoal-900">
                          <SmartImage src={r.imageUrl} className="w-full h-full object-cover" />
                          <button 
                            onClick={(e) => toggleCompare(r, e)}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          >
                              <X className="w-4 h-4 text-white" />
                          </button>
                      </div>
                  ))}
              </div>
              <div className="text-sm">
                  <span className="font-bold text-white">{compareList.length}</span> <span className="text-gray-400">selected</span>
              </div>
              <button 
                onClick={() => setShowCompareModal(true)}
                disabled={compareList.length < 2}
                className="bg-saffron-600 disabled:bg-gray-700 disabled:text-gray-500 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-saffron-700 transition-colors"
              >
                  Compare
              </button>
          </div>
      )}

      {/* --- RECIPE DETAIL DRAWER --- */}
      {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedRecipe(null)}></div>
              <div className="relative w-full md:w-[600px] h-full bg-charcoal-900 shadow-2xl overflow-y-auto animate-slide-up md:animate-none md:transition-transform">
                  <button 
                      onClick={() => setSelectedRecipe(null)}
                      className="absolute top-6 right-6 z-10 bg-black/40 p-2 rounded-full hover:bg-black/60 text-white"
                  >
                      <X className="w-6 h-6" />
                  </button>
                  
                  <div className="h-72 relative bg-charcoal-800">
                      <SmartImage src={selectedRecipe.imageUrl} className="w-full h-full object-cover" alt={selectedRecipe.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                          <h2 className="text-4xl font-serif font-bold text-white mb-2">{selectedRecipe.name}</h2>
                          <div className="flex gap-2">
                              <span className="bg-saffron-600 text-white px-2 py-1 rounded text-xs font-bold uppercase">{selectedRecipe.origin}</span>
                          </div>
                      </div>
                  </div>

                  <div className="p-8 space-y-8">
                      <p className="text-gray-300 italic border-l-2 border-saffron-500 pl-4">"{selectedRecipe.sensoryDescription}"</p>
                      
                      {/* Chef Tips - Tooltips */}
                      <div className="flex flex-wrap gap-2">
                          {Object.keys(CHEF_TIPS).map(key => {
                              const desc = CHEF_TIPS[key as keyof typeof CHEF_TIPS];
                              if (selectedRecipe.description.includes(key) || selectedRecipe.steps.some(s => s.desc.includes(key))) {
                                  return (
                                      <div key={key} className="group relative">
                                          <span className="text-xs font-bold text-saffron-400 border border-saffron-500/30 bg-saffron-500/10 px-3 py-1 rounded-full cursor-help flex items-center gap-1">
                                              <Info className="w-3 h-3" /> {key} Tip
                                          </span>
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs p-3 rounded-xl shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                              {desc}
                                              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45 border-r border-b border-white/10"></div>
                                          </div>
                                      </div>
                                  )
                              }
                              return null;
                          })}
                      </div>

                      <div>
                          <h3 className="text-lg font-bold text-white mb-4">Ingredients</h3>
                          <div className="grid grid-cols-2 gap-3">
                              {selectedRecipe.ingredients.map((ing, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 p-2 rounded-lg">
                                      <div className="w-1.5 h-1.5 bg-saffron-500 rounded-full"></div>
                                      <HighlightText text={`${ing.item} (${ing.qty})`} highlight={searchQuery} />
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div>
                          <h3 className="text-lg font-bold text-white mb-4">Steps</h3>
                          <div className="space-y-6 pl-4 border-l border-white/10">
                              {selectedRecipe.steps.map((step, i) => (
                                  <div key={i} className="relative pl-6">
                                      <div className="absolute -left-[21px] top-0 w-6 h-6 rounded-full bg-charcoal-800 border border-saffron-500 text-saffron-500 text-xs font-bold flex items-center justify-center">
                                          {i + 1}
                                      </div>
                                      <h4 className="font-bold text-gray-200 text-sm mb-1">{step.title}</h4>
                                      <p className="text-sm text-gray-400">
                                          <HighlightText text={step.desc} highlight={searchQuery} />
                                      </p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* --- COMPARE MODAL --- */}
      {showCompareModal && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
              <div className="bg-charcoal-900 w-full max-w-6xl h-full max-h-[90vh] rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-fade-in shadow-2xl">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center bg-charcoal-950">
                      <h2 className="text-2xl font-serif font-bold text-white">Compare Recipes</h2>
                      <button onClick={() => setShowCompareModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6 text-white" /></button>
                  </div>
                  
                  <div className="flex-1 overflow-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 min-h-full">
                          {compareList.map((recipe) => (
                              <div key={recipe.id} className="p-6 space-y-6">
                                  <div className="text-center">
                                      <div className="w-full h-40 mb-4 rounded-xl shadow-lg overflow-hidden bg-charcoal-800">
                                          <SmartImage src={recipe.imageUrl} className="w-full h-full object-cover" />
                                      </div>
                                      <h3 className="text-xl font-bold text-white mb-1">{recipe.name}</h3>
                                      <p className="text-saffron-400 text-sm font-bold uppercase">{recipe.origin}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 text-center">
                                      <div className="bg-white/5 p-2 rounded-lg">
                                          <p className="text-xs text-gray-500 uppercase">Time</p>
                                          <p className="font-bold text-white">{recipe.cookTime}</p>
                                      </div>
                                      <div className="bg-white/5 p-2 rounded-lg">
                                          <p className="text-xs text-gray-500 uppercase">Spice</p>
                                          <p className="font-bold text-white">{recipe.spiceLevel}/10</p>
                                      </div>
                                  </div>

                                  <div>
                                      <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2 mb-3">Key Ingredients</h4>
                                      <ul className="text-sm text-gray-400 space-y-1">
                                          {recipe.ingredients.slice(0,6).map((ing, i) => (
                                              <li key={i}>• {ing.item}</li>
                                          ))}
                                          {recipe.ingredients.length > 6 && <li className="italic text-xs opacity-50">+ {recipe.ingredients.length - 6} more</li>}
                                      </ul>
                                  </div>

                                  <div>
                                      <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2 mb-3">Technique</h4>
                                      <p className="text-sm text-gray-400 leading-relaxed">{recipe.steps[0].desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// Helper highlight component
const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="bg-saffron-500/30 text-saffron-200 font-bold px-0.5 rounded">{part}</span> : part
        )}
      </span>
    );
};
