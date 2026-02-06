
import React, { useState, useEffect } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  lqip?: string; // Low Quality Image Placeholder
  query?: string; // Fallback search query
}

export const SmartImage: React.FC<Props> = ({ src, fallbackSrc, className, alt, lqip, query, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else if (query || alt) {
        // Last resort: Try a generic search-based image from Unsplash
        const q = query || alt || 'food';
        setImgSrc(`https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`);
      }
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-charcoal-800 ${className}`}>
      {/* Loading State / LQIP */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal-800 z-10">
            {lqip ? (
                <img src={lqip} className="w-full h-full object-cover blur-xl scale-110 opacity-50" alt="" />
            ) : (
                <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
            )}
        </div>
      )}

      {/* Main Image */}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        {...props}
      />

      {/* Final Error State */}
      {hasError && !imgSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal-900 text-gray-600 border border-white/5">
          <ImageOff className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Asset Missing</span>
        </div>
      )}
    </div>
  );
};
