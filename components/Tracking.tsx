
import React, { useEffect, useState, useRef } from 'react';
import { Check, User, Phone, XCircle, MessageCircle, MapPin, Clock, Navigation, AlertTriangle, Share2, Layers, Zap, Home } from 'lucide-react';
import * as L from 'leaflet';
import { CinematicIntro } from './CinematicIntro';

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  onContactSupport: () => void;
}

const STEPS = [
    { title: 'Order Confirmed', desc: 'Restaurant has accepted your order.', time: '12:30 PM' },
    { title: 'Cooking in Pot', desc: 'Chef is layering the rice and meat.', time: '12:35 PM' },
    { title: 'Dum Process', desc: 'Sealed for slow cooking.', time: '12:45 PM' },
    { title: 'Rider Assigned', desc: 'Raju is on the way to pickup.', time: '12:55 PM' },
    { title: 'Out for Delivery', desc: 'Your biryani is on the move!', time: '1:05 PM' }
];

export const Tracking: React.FC<Props> = ({ onComplete, onCancel, onContactSupport }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(35);
  const [isDelayed, setIsDelayed] = useState(false);
  const [delayReason, setDelayReason] = useState('');
  const [showTraffic, setShowTraffic] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const riderMarker = useRef<L.Marker | null>(null);
  const trafficLayer = useRef<L.Polyline | null>(null);

  // Simulation Logic
  useEffect(() => {
    if (showIntro) return; // Pause sim during intro

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(onComplete, 8000); // Wait a bit before finishing
          return 4;
        }
        // Decrease ETA naturally unless delayed
        if (!isDelayed) setEta(e => Math.max(5, e - 5));
        
        return prev + 1;
      });
    }, 6000); // Fast simulation

    return () => clearInterval(interval);
  }, [onComplete, showIntro, isDelayed]);

  // Leaflet Map Setup
  useEffect(() => {
      if (!mapRef.current || mapInstance.current) return;

      // Initialize Map
      const map = L.map(mapRef.current, { zoomControl: false }).setView([17.3850, 78.4867], 13);
      mapInstance.current = map;

      // Dark Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; CARTO',
          maxZoom: 19
      }).addTo(map);

      // Icons
      const restIcon = L.divIcon({
          className: 'custom-pin',
          html: `<div style="background-color:#ea580c;width:32px;height:32px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 10px rgba(0,0,0,0.5);">🍲</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
      });
      const userIcon = L.divIcon({
          className: 'custom-pin',
          html: `<div style="background-color:#16a34a;width:32px;height:32px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 10px rgba(0,0,0,0.5);">🏠</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
      });
      const riderIconHtml = L.divIcon({
          className: 'custom-pin',
          html: `<div style="background-color:#f59e0b;width:40px;height:40px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 15px rgba(245,158,11,0.5);">🛵</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
      });

      // Coordinates (Hyderabad Simulation)
      const restLoc: [number, number] = [17.3850, 78.4867]; // Charminar
      const userLoc: [number, number] = [17.4401, 78.3489]; // Gachibowli

      // Add Static Markers
      L.marker(restLoc, { icon: restIcon }).addTo(map).bindPopup("Nizam's Kitchen");
      L.marker(userLoc, { icon: userIcon }).addTo(map).bindPopup('Home');

      // Create Route Line (Ideal Path)
      const routeLine = L.polyline([restLoc, userLoc], { color: '#f97316', weight: 4, opacity: 0.6, dashArray: '10, 10' }).addTo(map);
      
      // Fit bounds
      map.fitBounds(routeLine.getBounds(), { padding: [80, 80] });

      // Add Rider Marker (Start at Rest)
      riderMarker.current = L.marker(restLoc, { icon: riderIconHtml }).addTo(map);

      // Traffic Layer (Hidden by default)
      // Simulated traffic spots along the route
      const trafficPoints: [number, number][] = [
          [17.4000, 78.4500], [17.4100, 78.4400], [17.4200, 78.4300]
      ];
      trafficLayer.current = L.polyline(trafficPoints, { color: '#ef4444', weight: 8, opacity: 0.7, lineCap: 'round' });

      // Force resize calc
      setTimeout(() => map.invalidateSize(), 500);

  }, []);

  // Traffic Toggle
  useEffect(() => {
      if (!mapInstance.current || !trafficLayer.current) return;
      if (showTraffic) {
          trafficLayer.current.addTo(mapInstance.current);
      } else {
          trafficLayer.current.remove();
      }
  }, [showTraffic]);

  // Animate Rider Position
  useEffect(() => {
      if (!mapInstance.current || !riderMarker.current) return;
      
      const restLoc = { lat: 17.3850, lng: 78.4867 };
      const userLoc = { lat: 17.4401, lng: 78.3489 };

      // Simple interpolation based on currentStep (0 to 4)
      const progress = currentStep / 4; 
      const currentLat = restLoc.lat + (userLoc.lat - restLoc.lat) * progress;
      const currentLng = restLoc.lng + (userLoc.lng - restLoc.lng) * progress;

      riderMarker.current.setLatLng([currentLat, currentLng]);
      
      if (currentStep > 0 && currentStep < 4) {
          mapInstance.current.panTo([currentLat, currentLng], { animate: true, duration: 1 });
      }

  }, [currentStep]);

  const handleSimulateDelay = () => {
      setIsDelayed(true);
      setEta(prev => prev + 15);
      setDelayReason('Heavy traffic reported near Banjara Hills junction.');
      setShowTraffic(true); // Auto turn on traffic map
  };

  const handleShare = () => {
      // Mock copy
      alert("Tracking link copied: biryani360.com/track/B360-8821");
  };

  return (
    <div className="h-screen bg-charcoal-950 text-white flex flex-col md:flex-row overflow-hidden relative">
       
       {showIntro && (
            <CinematicIntro 
                lines={['fire is fading', 'wheels are turning', 'arrival imminent']} 
                onComplete={() => setShowIntro(false)} 
            />
       )}

       {/* --- LEFT PANEL: TIMELINE & DETAILS (35%) --- */}
       <div className="w-full md:w-[35%] bg-charcoal-900 border-r border-white/10 flex flex-col z-20 shadow-2xl h-1/2 md:h-full relative">
           
           {/* Header */}
           <div className="p-6 border-b border-white/10 bg-charcoal-950/50 backdrop-blur-md">
               <div className="flex justify-between items-start mb-4">
                   <div>
                       <h1 className="text-2xl font-bold font-serif text-cream-50">Tracking Order</h1>
                       <div className="flex items-center gap-2 mt-1">
                           <p className="text-sm text-gray-400">ID: #B360-8821</p>
                           <button onClick={handleShare} className="text-saffron-500 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                       </div>
                   </div>
                   <div className="text-right">
                       <p className={`text-3xl font-bold ${isDelayed ? 'text-red-500' : 'text-saffron-500'}`}>{eta} <span className="text-sm text-gray-400 font-normal">mins</span></p>
                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Estimated Arrival</p>
                   </div>
               </div>
               
               {isDelayed && (
                   <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-xl flex items-start gap-3 text-red-200 text-sm animate-pulse mt-2">
                       <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                       <div>
                           <span className="font-bold block text-red-400">Delay Alert (+15m)</span>
                           <span className="text-xs opacity-80">{delayReason}</span>
                       </div>
                   </div>
               )}
           </div>

           {/* Timeline Scroll Area */}
           <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
               <div className="relative pl-4 border-l-2 border-dashed border-gray-700 space-y-8 ml-2">
                   {STEPS.map((step, idx) => (
                       <div key={idx} className={`relative pl-8 transition-all duration-500 ${idx > currentStep ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}>
                           {/* Step Dot */}
                           <div className={`absolute -left-[25px] top-0 w-8 h-8 rounded-full border-4 border-charcoal-900 flex items-center justify-center transition-all duration-500 z-10
                                ${idx <= currentStep 
                                    ? 'bg-green-500 text-white scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                                    : 'bg-charcoal-800 border-gray-600'
                                }
                           `}>
                                {idx < currentStep ? <Check className="w-4 h-4" /> : <div className={`w-2 h-2 rounded-full ${idx === currentStep ? 'bg-white animate-ping' : 'bg-gray-500'}`}></div>}
                           </div>
                           
                           {/* Content */}
                           <div className="flex justify-between items-start">
                               <div>
                                   <h3 className={`font-bold text-lg ${idx === currentStep ? 'text-saffron-400' : 'text-gray-200'}`}>{step.title}</h3>
                                   <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                               </div>
                               <span className="text-xs text-gray-600 font-mono pt-1">{step.time}</span>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

           {/* Footer Actions */}
           <div className="p-4 bg-charcoal-950 flex flex-col gap-3 border-t border-white/10">
               <div className="flex gap-3">
                    <button 
                        onClick={onCancel}
                        disabled={currentStep > 1}
                        className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 font-bold text-sm hover:bg-red-900/20 hover:text-red-400 hover:border-red-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onContactSupport}
                        className="flex-1 py-3 rounded-xl bg-white text-charcoal-950 font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        Help
                    </button>
               </div>
               {/* New Browse Button */}
               <button 
                   onClick={onCancel} // Reuses "Cancel" prop which maps to "Menu" in App.tsx
                   className="w-full py-3 rounded-xl bg-charcoal-800 text-saffron-500 font-bold text-sm border border-saffron-500/20 hover:bg-charcoal-700 hover:border-saffron-500/50 transition-colors flex items-center justify-center gap-2"
               >
                   <Home className="w-4 h-4" /> Browse More
               </button>
           </div>
       </div>

       {/* --- RIGHT PANEL: MAP (65%) --- */}
       <div className="w-full md:w-[65%] relative h-1/2 md:h-full bg-charcoal-950">
           <div ref={mapRef} className="absolute inset-0 z-0 h-full w-full" />
           
           {/* Fallback Static Map */}
           <div className="absolute inset-0 z-[-1] bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/San_Francisco_Map_Lighter_Grayscale.jpg')] bg-cover opacity-20"></div>

           {/* Map Overlay Gradients */}
           <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal-950 via-transparent to-transparent md:bg-gradient-to-l"></div>

           {/* Floating Map Controls */}
           <div className="absolute top-6 right-6 z-[400] flex flex-col gap-3">
               <div className="bg-charcoal-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center gap-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-gray-200">Live GPS</span>
               </div>
               
               <button 
                    onClick={() => setShowTraffic(!showTraffic)}
                    className={`p-3 rounded-full border shadow-xl transition-all ${showTraffic ? 'bg-red-600 border-red-500 text-white' : 'bg-charcoal-900/90 border-white/10 text-gray-400 hover:text-white'}`}
               >
                   <Layers className="w-5 h-5" />
               </button>
           </div>

           {/* Dev Tool: Simulate Slip */}
           <div className="absolute bottom-6 left-6 z-[400]">
               <button 
                    onClick={handleSimulateDelay}
                    className="bg-black/50 hover:bg-black/80 backdrop-blur text-gray-500 text-[10px] px-3 py-1 rounded border border-white/5 flex items-center gap-1 transition-colors"
               >
                   <Zap className="w-3 h-3" /> Sim Delay
               </button>
           </div>

           {/* Floating Rider Card (Appears at Step 3+) */}
           {currentStep >= 3 && (
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[400] w-[90%] max-w-sm animate-slide-up">
                   <div className="bg-charcoal-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 relative overflow-hidden group">
                       {/* Shine Effect */}
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                       
                       <div className="relative">
                           <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100" className="w-14 h-14 rounded-full border-2 border-saffron-500" alt="Rider" />
                           <div className="absolute -bottom-1 -right-1 bg-green-500 text-charcoal-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-charcoal-900">4.9 ★</div>
                       </div>
                       <div className="flex-1">
                           <h4 className="font-bold text-white text-lg">Raju Kumar</h4>
                           <p className="text-xs text-gray-400">Driving • AP 09 CX 1234</p>
                           <p className="text-[10px] text-green-400 mt-0.5 flex items-center gap-1"><Check className="w-3 h-3" /> Vaccinated</p>
                       </div>
                       <div className="flex gap-2">
                           <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><MessageCircle className="w-5 h-5 text-white" /></button>
                           <button className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-lg"><Phone className="w-5 h-5 text-white" /></button>
                       </div>
                   </div>
               </div>
           )}
       </div>

    </div>
  );
};
