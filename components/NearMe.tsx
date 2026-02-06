import React, { useState, useEffect, useRef } from 'react';
import { NEARBY_RESTAURANTS } from '../constants';
import { Restaurant } from '../types';
import { ArrowLeft, MapPin, Star, Navigation, Clock, Leaf, X, Settings } from 'lucide-react';
import * as L from 'leaflet';
import { CinematicIntro } from './CinematicIntro';

interface Props {
  onBack: () => void;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export const NearMe: React.FC<Props> = ({ onBack, onRestaurantSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showConfig, setShowConfig] = useState(false);
  const [tileProvider, setTileProvider] = useState<'DARK' | 'OSM'>('DARK');
  const [showIntro, setShowIntro] = useState(true);

  const filteredRestaurants = NEARBY_RESTAURANTS.filter(r => {
    if (activeFilter === 'Walkable') return r.walkable;
    if (activeFilter === 'Top Rated') return r.rating >= 4.5;
    if (activeFilter === 'New') return r.isNew;
    return true;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current || map) return;

    // Fix Leaflet Icons in ESM
    const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const initialMap = L.map(mapContainer.current, {
        zoomControl: false,
        attributionControl: false
    }).setView([17.3850, 78.4867], 13); // Hyderabad

    L.control.zoom({ position: 'bottomright' }).addTo(initialMap);
    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(initialMap);

    setMap(initialMap);

    return () => {
        initialMap.remove();
    };
  }, []);

  // Handle Tile Provider Switch
  useEffect(() => {
    if (!map) return;
    
    // Clear existing layers
    map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) layer.remove();
    });

    const tiles = tileProvider === 'DARK' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution = tileProvider === 'DARK'
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; OpenStreetMap contributors';

    L.tileLayer(tiles, {
        attribution: attribution,
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

  }, [map, tileProvider]);

  // Handle Markers
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) layer.remove();
    });

    // Custom Icon
    const handiIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="
            background-color: #f97316;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        ">🍲</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    const activeIcon = L.divIcon({
        className: 'active-pin',
        html: `<div style="
            background-color: #ea580c;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(234, 88, 12, 0.6);
            transform: scale(1.1);
        ">🍲</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    filteredRestaurants.forEach(r => {
        const marker = L.marker([r.coordinates.lat, r.coordinates.lng], {
            icon: selectedRestaurant?.id === r.id ? activeIcon : handiIcon
        }).addTo(map);

        marker.on('click', () => {
            setSelectedRestaurant(r);
            map.flyTo([r.coordinates.lat, r.coordinates.lng], 15, { duration: 1 });
        });
    });

  }, [map, filteredRestaurants, selectedRestaurant]);

  return (
    <div className="h-screen w-full relative bg-charcoal-950">
        
        {showIntro && (
            <CinematicIntro 
                lines={['triangulating aroma', 'finding the hidden handis', 'navigation locked']} 
                onComplete={() => setShowIntro(false)} 
            />
        )}

        {/* Map Container */}
        <div ref={mapContainer} className="absolute inset-0 z-0" />

        {/* --- HEADER --- */}
        <div className="absolute top-0 left-0 w-full z-10 p-4 pt-6 pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
                <button 
                    onClick={onBack}
                    className="bg-charcoal-900/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-charcoal-800 transition-colors border border-white/10 text-white"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="bg-charcoal-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex-1 border border-white/10 max-w-sm">
                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider font-bold mb-0.5">
                        <MapPin className="w-3 h-3 text-saffron-500" /> Current Location
                    </div>
                    <div className="font-bold text-white text-sm truncate">
                        Gachibowli, Hyderabad, Telangana
                    </div>
                </div>
                <button 
                    onClick={() => setShowConfig(!showConfig)}
                    className="bg-charcoal-900/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-charcoal-800 transition-colors border border-white/10 text-white ml-auto md:ml-0"
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>

            {/* Filters */}
            <div className="mt-4 flex gap-3 overflow-x-auto hide-scrollbar pointer-events-auto pb-2">
                {['All', 'Walkable', 'Top Rated', 'New'].map((f) => (
                    <button
                        key={f}
                        onClick={() => {
                            setActiveFilter(f);
                            setSelectedRestaurant(null);
                        }}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95 border
                            ${activeFilter === f 
                                ? 'bg-saffron-600 border-saffron-600 text-white shadow-saffron-500/30' 
                                : 'bg-charcoal-900/90 border-white/10 text-gray-300 hover:bg-charcoal-800'}
                        `}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>

        {/* --- MAP CONFIG POPUP --- */}
        {showConfig && (
            <div className="absolute top-20 right-4 z-20 bg-charcoal-900 border border-white/10 rounded-2xl p-4 shadow-2xl w-64 animate-fade-in">
                <h3 className="font-bold text-white mb-3 text-sm">Map Configuration</h3>
                <div className="space-y-3">
                    <label className="flex items-center justify-between text-sm text-gray-300">
                        <span>Tile Provider</span>
                        <select 
                            value={tileProvider}
                            onChange={(e) => setTileProvider(e.target.value as any)}
                            className="bg-charcoal-800 border border-white/20 rounded px-2 py-1 text-xs"
                        >
                            <option value="DARK">Dark Matter</option>
                            <option value="OSM">OpenStreetMap</option>
                        </select>
                    </label>
                </div>
            </div>
        )}

        {/* --- RESTAURANT CARD (BOTTOM SHEET) --- */}
        {selectedRestaurant && (
            <div className="absolute bottom-6 left-4 right-4 z-20 animate-slide-up flex justify-center">
                <div className="bg-charcoal-900 rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden w-full max-w-xl">
                    <div className="flex flex-row h-40">
                        <div className="w-1/3 relative">
                            <img 
                                src={selectedRestaurant.imageUrl} 
                                alt={selectedRestaurant.name}
                                className="w-full h-full object-cover" 
                            />
                            {selectedRestaurant.walkable && (
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                                    <Leaf className="w-3 h-3" /> Eco Walk
                                </span>
                            )}
                        </div>
                        <div className="flex-1 p-5 flex flex-col justify-between relative">
                            <button 
                                onClick={() => setSelectedRestaurant(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white line-clamp-1">{selectedRestaurant.name}</h3>
                                <p className="text-saffron-500 text-xs font-bold uppercase tracking-wide">{selectedRestaurant.desc}</p>
                                
                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-gray-500" /> {selectedRestaurant.distance}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-gray-500" /> {selectedRestaurant.time}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-2">
                                <a 
                                    href={`/?screen=RESTAURANT_DETAIL&id=${selectedRestaurant.id}`}
                                    onClick={(e) => {
                                        if(!e.ctrlKey && !e.metaKey) {
                                            e.preventDefault();
                                            onRestaurantSelect(selectedRestaurant);
                                        }
                                    }}
                                    className="flex-1 bg-white hover:bg-gray-200 text-charcoal-900 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    View Menu
                                </a>
                                <button className="p-2.5 bg-charcoal-800 border border-white/10 rounded-xl hover:bg-charcoal-700 transition-colors">
                                    <Navigation className="w-5 h-5 text-gray-300" />
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