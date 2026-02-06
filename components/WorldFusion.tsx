
import React, { useState } from 'react';
import { MASTER_RECIPE_LIBRARY, WORLD_FUSION_IDS } from '../constants';
import { RecipeDetail } from '../types';
import { ArrowLeft, Globe, Utensils, Flame, Info, X, Clock, ChefHat, ShoppingBag, FileText, Download, Heart } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface Props {
  onBack: () => void;
}

export const WorldFusion: React.FC<Props> = ({ onBack }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);
  
  const fusionRecipes = WORLD_FUSION_IDS.map(id => MASTER_RECIPE_LIBRARY[id]).filter(Boolean);

  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-50 font-sans relative overflow-x-hidden">
      
      {/* --- CINEMATIC HEADER --- */}
      <div className="relative h-80 w-full overflow-hidden">
          <div className="absolute inset-0 bg-charcoal-900">
              <SmartImage 
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2000" 
                className="w-full h-full object-cover opacity-60"
                alt="Global Kitchen"
              />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/30 via-charcoal-950/10 to-charcoal-950"></div>
          
          <div className="absolute top-0 left-0 w-full p-6 z-10 flex items-center gap-4">
              <button onClick={onBack} className="bg-charcoal-900/50 backdrop-blur-md p-3 rounded-full hover:bg-white/10 transition-colors border border-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <span className="text-sm font-bold uppercase tracking-widest text-saffron-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-saffron-500/30">
                  Global Kitchen
              </span>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight">
                  World Biryani <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 to-gold-400">& Fusion</span>
              </h1>
              <p className="text-gray-300 max-w-lg text-lg font-light leading-relaxed">
                  From the streets of Dhaka to Korean fusion labs. Discover how the world reinterprets the art of Dum.
              </p>
          </div>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fusionRecipes.map((recipe) => (
                  <div 
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="group relative bg-charcoal-900 rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-saffron-500/40 hover:shadow-2xl hover:shadow-saffron-900/20 transition-all duration-500 hover:-translate-y-2"
                  >
                      <div className="h-64 overflow-hidden relative">
                          <SmartImage 
                            src={recipe.imageUrl} 
                            alt={recipe.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            query={`${recipe.origin} food`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80"></div>
                          
                          <div className="absolute top-4 left-4">
                              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg
                                  ${recipe.type === 'Fusion' ? 'bg-purple-600 text-white' : 'bg-charcoal-800 text-gray-300 border border-white/10'}
                              `}>
                                  {recipe.type === 'Fusion' ? <Utensils className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                                  {recipe.origin}
                              </span>
                          </div>
                      </div>

                      <div className="p-6 relative">
                          <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-saffron-400 transition-colors">{recipe.name}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">{recipe.description}</p>
                          
                          <div className="flex items-center justify-between border-t border-white/10 pt-4">
                              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                  <Flame className="w-4 h-4 text-red-500" /> Spice: {recipe.spiceLevel}/10
                              </div>
                              <span className="text-saffron-500 text-xs font-bold group-hover:underline">Explore Recipe &rarr;</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedRecipe && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <div className="absolute inset-0 bg-charcoal-950/95 backdrop-blur-xl" onClick={() => setSelectedRecipe(null)}></div>
              
              <div className="bg-charcoal-900 w-full max-w-4xl max-h-full rounded-[2rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden border border-white/10 animate-slide-up">
                  
                  <button onClick={() => setSelectedRecipe(null)} className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white backdrop-blur-md transition-colors border border-white/10">
                      <X className="w-6 h-6" />
                  </button>

                  {/* Left: Visuals */}
                  <div className="md:w-2/5 h-64 md:h-auto relative bg-charcoal-800">
                      <SmartImage src={selectedRecipe.imageUrl} className="w-full h-full object-cover" alt="" query={selectedRecipe.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 md:bg-gradient-to-r md:from-transparent md:to-charcoal-900"></div>
                      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-8">
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-none">{selectedRecipe.name}</h2>
                          <p className="text-saffron-400 font-bold uppercase tracking-wider text-xs">{selectedRecipe.origin}</p>
                      </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:w-3/5 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                      {/* Source Citation */}
                      {selectedRecipe.source && (
                          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-widest bg-white/5 w-fit px-3 py-1 rounded-lg border border-white/5">
                              <Info className="w-3 h-3" /> {selectedRecipe.source}
                          </div>
                      )}

                      <div className="space-y-8">
                          <div>
                              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Utensils className="w-5 h-5 text-saffron-500" /> Flavor Profile
                              </h3>
                              <p className="text-gray-300 italic leading-relaxed border-l-2 border-saffron-500 pl-4">
                                  "{selectedRecipe.sensoryDescription}"
                              </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                              <div className="bg-charcoal-800/50 p-4 rounded-xl border border-white/5">
                                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Cook Time</p>
                                  <div className="flex items-center gap-2 text-white font-bold">
                                      <Clock className="w-4 h-4 text-saffron-500" /> {selectedRecipe.cookTime}
                                  </div>
                              </div>
                              <div className="bg-charcoal-800/50 p-4 rounded-xl border border-white/5">
                                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Difficulty</p>
                                  <div className="flex items-center gap-2 text-white font-bold">
                                      <ChefHat className="w-4 h-4 text-saffron-500" /> {selectedRecipe.difficulty}
                                  </div>
                              </div>
                          </div>

                          <div>
                              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-saffron-500" /> Key Steps
                              </h3>
                              <div className="space-y-4">
                                  {selectedRecipe.steps.map((step, i) => (
                                      <div key={i} className="flex gap-4">
                                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-saffron-900/50 border border-saffron-500/30 text-saffron-400 text-xs font-bold flex items-center justify-center mt-0.5">
                                              {i + 1}
                                          </div>
                                          <div>
                                              <h4 className="text-sm font-bold text-gray-200 mb-1">{step.title}</h4>
                                              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div>
                              <h3 className="text-lg font-bold text-white mb-4">Pairing Suggestions</h3>
                              <div className="flex flex-wrap gap-2">
                                  {selectedRecipe.pairings.map((p,i) => (
                                      <span key={i} className="bg-charcoal-800 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                                          {p}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          <div className="flex gap-3 pt-4 border-t border-white/10">
                              <button className="flex-1 bg-white text-charcoal-950 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                  <ShoppingBag className="w-4 h-4" /> Find Ingredients
                              </button>
                              <button className="bg-charcoal-800 hover:bg-charcoal-700 text-white p-3.5 rounded-xl transition-colors border border-white/10">
                                  <Download className="w-5 h-5" />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
