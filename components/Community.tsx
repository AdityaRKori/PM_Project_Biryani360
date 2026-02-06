import React, { useState } from 'react';
import { COMMUNITY_POSTS, LEADERBOARD_DATA, MENU_ITEMS } from '../constants';
import { Star, ThumbsUp, MessageCircle, Award, Share2, Plus, ArrowLeft, TrendingUp, Trophy } from 'lucide-react';

interface Props {
  onBackHome: () => void;
}

export const Community: React.FC<Props> = ({ onBackHome }) => {
  // Filter for Top Rated Biryanis
  const topRatedBiryanis = MENU_ITEMS.filter(item => item.rating >= 4.6);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="bg-white sticky top-0 z-20 shadow-sm border-b border-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <button onClick={onBackHome} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ArrowLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <div>
                      <h1 className="text-xl font-bold text-gray-900">Biryani Community</h1>
                      <p className="text-xs text-saffron-600 font-medium">Connect with fellow lovers of the Dum</p>
                  </div>
              </div>
              <button className="bg-gray-900 text-white p-2 rounded-full shadow-lg active:scale-95 transition-transform">
                  <Plus className="w-5 h-5" />
              </button>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
          
          {/* --- SECTION 1: TOP RATED (HORIZONTAL SCROLL) --- */}
          <section className="pt-6 pb-4">
             <div className="px-4 flex items-center gap-2 mb-4">
                 <TrendingUp className="w-5 h-5 text-saffron-600" />
                 <h2 className="font-bold text-gray-900 text-lg">Top Rated Biryanis</h2>
             </div>
             
             <div className="flex overflow-x-auto gap-4 px-4 pb-4 hide-scrollbar snap-x">
                 {topRatedBiryanis.map((item) => (
                     <div key={item.id} className="snap-center min-w-[260px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0">
                         <div className="h-32 relative">
                             <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                             <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                                {item.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                             </div>
                         </div>
                         <div className="p-3">
                             <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                             <p className="text-xs text-gray-500 mb-2">{item.style} Style</p>
                             <div className="flex items-center justify-between">
                                 <span className="text-saffron-600 font-bold text-sm">₹{item.price}</span>
                                 <button className="text-[10px] font-bold bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700">Order</button>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
          </section>

          {/* --- SECTION 2: LEADERBOARD WIDGET --- */}
          <section className="px-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                  
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <h2 className="font-bold text-lg">Leaderboard</h2>
                  </div>

                  <div className="space-y-4 relative z-10">
                      {LEADERBOARD_DATA.map((user) => (
                          <div key={user.rank} className="flex items-center gap-4 bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                  ${user.rank === 1 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-700 text-gray-300'}
                              `}>
                                  #{user.rank}
                              </div>
                              <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white/20" alt={user.name} />
                              <div className="flex-1">
                                  <h4 className="font-bold text-sm">{user.name}</h4>
                                  <p className="text-xs text-indigo-200">{user.badge}</p>
                              </div>
                              <div className="text-right">
                                  <span className="block font-bold text-yellow-400 text-sm">{user.points}</span>
                                  <span className="text-[10px] text-gray-400">PTS</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          {/* --- SECTION 3: COMMUNITY DISCUSSIONS --- */}
          <section className="px-4">
              <div className="flex items-center gap-2 mb-4">
                 <MessageCircle className="w-5 h-5 text-saffron-600" />
                 <h2 className="font-bold text-gray-900 text-lg">Community Discussions</h2>
              </div>

              <div className="space-y-6">
                  {COMMUNITY_POSTS.map((post) => (
                      <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          {/* User Info */}
                          <div className="flex justify-between items-start mb-3">
                              <div className="flex gap-3">
                                  <img src={post.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100" alt={post.user} />
                                  <div>
                                      <h4 className="font-bold text-gray-900 text-sm">{post.user}</h4>
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border
                                              ${post.badge === 'Spice Master' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                                              ${post.badge === 'Eco Walker' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                                              ${post.badge === 'Dum Expert' ? 'bg-orange-50 text-orange-700 border-orange-100' : ''}
                                          `}>
                                              <Award className="w-3 h-3" /> {post.badge}
                                          </span>
                                          <span className="text-[10px] text-gray-400">• {post.time}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                  {post.rating} <Star className="w-3 h-3 fill-current" />
                              </div>
                          </div>

                          {/* Content */}
                          <p className="text-gray-700 text-sm leading-relaxed mb-3">{post.content}</p>
                          
                          {/* Optional Image */}
                          {post.image && (
                              <div className="rounded-xl overflow-hidden mb-4">
                                  <img src={post.image} className="w-full h-48 object-cover" alt="Post" />
                              </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                              <div className="flex items-center gap-6">
                                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-saffron-600 transition-colors">
                                      <ThumbsUp className="w-4 h-4" />
                                      <span className="text-xs font-bold">{post.likes}</span>
                                  </button>
                                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-saffron-600 transition-colors">
                                      <MessageCircle className="w-4 h-4" />
                                      <span className="text-xs font-bold">{post.replies}</span>
                                  </button>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                  <Share2 className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </section>

      </div>
    </div>
  );
};