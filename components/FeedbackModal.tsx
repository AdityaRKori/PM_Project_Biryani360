import React, { useState } from 'react';
import { X, Star, Send, Camera, Gift } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const FeedbackModal: React.FC<Props> = ({ isOpen, onClose, title = "Rate your experience" }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
      setSubmitted(true);
      setTimeout(() => {
          setSubmitted(false);
          setRating(0);
          setReview('');
          setHasPhoto(false);
          onClose();
      }, 3000);
  };

  // Calculate potential points
  const potentialPoints = (rating > 0 ? 10 : 0) + (review.length > 10 ? 20 : 0) + (hasPhoto ? 20 : 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-charcoal-900 w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl animate-slide-up overflow-hidden border border-white/10 text-white">
        {!submitted ? (
            <>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
                
                <h2 className="text-xl font-bold text-center mb-2 text-white">{title}</h2>
                <div className="flex items-center justify-center gap-2 mb-6 text-saffron-500 font-bold bg-saffron-500/10 py-1 px-3 rounded-full w-fit mx-auto text-sm border border-saffron-500/20">
                    <Gift className="w-4 h-4" /> Earn up to 50 pts
                </div>

                <div className="flex justify-center gap-3 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                        >
                            <Star 
                                className={`w-10 h-10 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                            />
                        </button>
                    ))}
                </div>

                <textarea 
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us more for +20 pts..."
                    className="input-premium mb-4"
                    rows={3}
                />

                <div 
                    onClick={() => setHasPhoto(!hasPhoto)}
                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center mb-6 cursor-pointer transition-colors
                        ${hasPhoto 
                            ? 'border-green-500 bg-green-900/20 text-green-500' 
                            : 'border-white/10 text-gray-400 hover:border-white/30'}
                    `}
                >
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">{hasPhoto ? 'Photo Added (+20 pts)' : 'Add Photo (+20 pts)'}</span>
                </div>

                <button 
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className="w-full bg-saffron-600 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2 btn-gold border-none"
                >
                    Submit & Earn {potentialPoints > 0 ? `+${potentialPoints} Pts` : ''} <Send className="w-4 h-4" />
                </button>
            </>
        ) : (
            <div className="text-center py-8 relative">
                 {/* Confetti (Simple CSS representation) */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                     <div className="absolute top-10 left-10 w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                     <div className="absolute top-5 right-20 w-3 h-3 bg-yellow-500 rotate-45 animate-spin"></div>
                     <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                </div>

                <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Points Added!</h3>
                <p className="text-saffron-500 font-bold text-lg">+{potentialPoints} Biryani Points</p>
                <p className="text-gray-400 text-sm mt-4">Wallet Updated Successfully</p>
            </div>
        )}
      </div>
    </div>
  );
};