import React, { useState } from 'react';
import { MapPin, Navigation, Search, CheckCircle, Camera, Flame, User } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onComplete: () => void;
}

export const Profile: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [spiceLevel, setSpiceLevel] = useState(5);
  const [locationState, setLocationState] = useState<'PROMPT' | 'DENIED' | 'GRANTED'>('PROMPT');
  const [loading, setLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const requestLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLoading(false);
          setLocationState('GRANTED');
        },
        () => {
          setLoading(false);
          setLocationState('DENIED');
        }
      );
    } else {
      setLoading(false);
      setLocationState('DENIED');
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim()) setStep(2);
  };

  const finishSetup = () => {
      onComplete();
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6 max-w-lg mx-auto text-cream-50">
      
      {/* Progress */}
      <div className="w-full flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-saffron-500' : 'bg-white/10'}`}></div>
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-saffron-500' : 'bg-white/10'}`}></div>
      </div>

      <div className="w-full space-y-8 animate-fade-in">
        <div className="text-center">
            <Logo size="md" variant="light" className="mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white">
                {step === 1 ? 'Setup Your Profile' : 'Set Your Location'}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
                {step === 1 ? 'Personalize your biryani experience.' : 'We need this to find the best handis near you.'}
            </p>
        </div>

        {step === 1 && (
            <form onSubmit={handleProfileSubmit} className="space-y-8">
                {/* Avatar Upload */}
                <div className="flex justify-center">
                    <div className="relative w-24 h-24 bg-charcoal-900 rounded-full flex items-center justify-center border-2 border-dashed border-white/20 cursor-pointer hover:border-saffron-500 transition-colors group">
                        <User className="w-8 h-8 text-gray-500" />
                        <div className="absolute bottom-0 right-0 bg-saffron-500 text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="input-premium text-xl font-bold"
                        autoFocus
                    />
                </div>

                {/* Spice Slider */}
                <div className="bg-charcoal-900 p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                            <Flame className="w-4 h-4 text-red-500" /> Spice Baseline
                        </label>
                        <span className="bg-charcoal-800 text-red-400 px-3 py-1 rounded-lg text-sm font-bold border border-white/10 shadow-sm">
                            {spiceLevel}/10
                        </span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        value={spiceLevel}
                        onChange={(e) => setSpiceLevel(parseInt(e.target.value))}
                        className="rice-slider"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-medium uppercase tracking-wider">
                        <span>Mild</span>
                        <span>Medium</span>
                        <span>Fire</span>
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full bg-saffron-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-saffron-500/30 active:scale-95 transition-all disabled:opacity-50 btn-gold border-none"
                >
                    Continue
                </button>
            </form>
        )}

        {step === 2 && (
            <div className="space-y-6">
                {locationState === 'PROMPT' && (
                    <>
                        <div className="bg-saffron-900/20 p-8 rounded-full w-40 h-40 mx-auto flex items-center justify-center relative">
                             <div className="absolute inset-0 bg-saffron-500/10 rounded-full animate-ping"></div>
                             <MapPin className="w-16 h-16 text-saffron-500" />
                        </div>
                        
                        <button 
                            onClick={requestLocation}
                            disabled={loading}
                            className="w-full bg-saffron-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-saffron-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 btn-gold border-none"
                        >
                            {loading ? 'Locating...' : <><Navigation className="w-5 h-5" /> Allow Location Access</>}
                        </button>
                        
                        <button 
                            onClick={() => setLocationState('DENIED')}
                            className="w-full py-4 text-gray-400 font-bold text-sm hover:text-white transition-colors"
                        >
                            Enter Location Manually
                        </button>
                    </>
                )}

                {locationState === 'DENIED' && (
                    <div className="animate-fade-in space-y-4">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search area, street name..."
                                className="input-premium pl-12"
                                value={manualAddress}
                                onChange={(e) => setManualAddress(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button 
                            onClick={() => setLocationState('GRANTED')}
                            disabled={!manualAddress}
                            className="w-full bg-white text-charcoal-950 py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 shadow-lg hover:bg-gray-200"
                        >
                            Confirm Location
                        </button>
                        <button onClick={() => setLocationState('PROMPT')} className="text-sm text-gray-500 w-full hover:text-white">Back</button>
                    </div>
                )}

                {locationState === 'GRANTED' && (
                    <div className="text-center space-y-6 animate-slide-up">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="text-xl font-bold text-white">All Set!</h3>
                        <div className="bg-charcoal-800 h-32 rounded-xl w-full relative overflow-hidden border border-white/10">
                             <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/San_Francisco_Map_Lighter_Grayscale.jpg')] bg-cover mix-blend-luminosity"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-3 h-3 bg-saffron-600 rounded-full ring-4 ring-saffron-600/30"></div>
                             </div>
                        </div>
                        <button 
                            onClick={finishSetup}
                            className="w-full bg-white text-charcoal-950 py-4 rounded-xl font-bold shadow-xl active:scale-95 transition-all hover:bg-gray-200"
                        >
                            Start Exploring
                        </button>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};